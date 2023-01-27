use argon2::Config;
use axum::Extension;
use axum::{routing::get, Router, Json, response::Result};
use axum::http::StatusCode;
use axum_macros::debug_handler;
use serde::Deserialize;
use serde_json::{Value, json};
use sqlx::{PgPool, query_as, Executor, query};

const SALT: &str = "WvEeaZROcLQWtEgP";

enum Role {
    Admin,
    Creator,

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

#[debug_handler]
async fn signup(Extension(pool): Extension<PgPool>, Json(data): Json<SignUp>) -> Result<Json<Value>, StatusCode> {
    let hash = argon2::hash_encoded(data.password.as_bytes(), SALT.as_bytes(), &Config::default()).unwrap();
    let res = query!("INSERT into userr (user_name, user_mail, password, user_role) VALUES ($1, $2, $3, $4) RETURNING user_id", data.name.as_str(), data.email.as_str(),hash, data.role.as_str()).fetch_one(&pool).await.unwrap();

    let user_id = res.user_id;

    Ok(Json(json!({"id": user_id})))
}

#[debug_handler]
async fn login(Extension(pool): Extension<PgPool>, Json(data): Json<LogIn>) -> Result<Json<Value>, StatusCode> {
    Ok(Json(json!({"auth": "hash"})))
}

pub fn auth() -> Router {
    Router::new()
        .route("/login", get(login))
        .route("/signup", get(signup))
}
