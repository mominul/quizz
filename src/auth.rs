use argon2::Config;
use axum::Extension;
use axum::{routing::post, Router, Json, response::Result};
use axum::http::StatusCode;
use axum_macros::debug_handler;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use sqlx::{PgPool, query_as, Executor, query};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};

const SALT: &str = "WvEeaZROcLQWtEgP";
const JWT_SECRET: &[u8] = b"gtuywdguybdeghgvfeghjwv";

enum Role {
    Admin,
    Creator,

}

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: i32,
    role: String,
    exp: usize,
}

#[derive(Deserialize)]
struct LogIn {
    email: String,
    password: String
}

#[derive(Deserialize)]
struct SignUp {
    name: String,
    email: String,
    password: String,
    role: String,
}


pub fn create_jwt(user_id: i32, role: String) -> String {
    let expiration = Utc::now()
        .checked_add_signed(chrono::Duration::seconds(60))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: user_id,
        role: role,
        exp: expiration as usize,
    };
    let header = Header::new(Algorithm::HS512);
    encode(&header, &claims, &EncodingKey::from_secret(JWT_SECRET)).unwrap()
}

#[debug_handler]
async fn signup(Extension(pool): Extension<PgPool>, Json(data): Json<SignUp>) -> Result<Json<Value>, StatusCode> {
    let hash = argon2::hash_encoded(data.password.as_bytes(), SALT.as_bytes(), &Config::default()).unwrap();
    let res = query!("INSERT into userr (user_name, user_mail, password, user_role) VALUES ($1, $2, $3, $4) RETURNING user_id", data.name.as_str(), data.email.as_str(),hash, data.role.as_str()).fetch_one(&pool).await.unwrap();

    let user_id = res.user_id;
    let token = create_jwt(user_id, data.role);

    Ok(Json(json!({"auth": token})))
}

#[debug_handler]
async fn login(Extension(pool): Extension<PgPool>, Json(data): Json<LogIn>) -> Result<Json<Value>, StatusCode> {
    let hash = argon2::hash_encoded(data.password.as_bytes(), SALT.as_bytes(), &Config::default()).unwrap();
    let res = query!("SELECT user_id, user_role FROM userr WHERE user_mail = $1 AND password = $2", data.email, hash).fetch_one(&pool).await.map_err(|x| StatusCode::NOT_FOUND)?;
    let id = res.user_id;
    let token = create_jwt(id, res.user_role.unwrap());
    Ok(Json(json!({"auth": token})))
}

pub fn auth() -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/signup", post(signup))
}
