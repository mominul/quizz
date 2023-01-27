use axum::Extension;
use axum::extract::State;
use axum::{routing::get, Router, Json, response::Result};
use axum::http::StatusCode;
use axum_macros::debug_handler;
use serde::Deserialize;
use serde_json::{Value, json};
use sqlx::PgPool;

#[derive(Deserialize)]
struct LogIn {
    email: String,
    password: String
}

#[derive(Deserialize)]
struct SignUp {
    name: String,
    email: String,
    password: String
}

#[debug_handler]
async fn signup(Extension(pool): Extension<PgPool>, Json(data): Json<SignUp>) -> StatusCode {
    StatusCode::OK
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
