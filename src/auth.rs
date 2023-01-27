use axum::{routing::get, Router, Json, response::Result};
use axum::http::StatusCode;
use axum_macros::debug_handler;
use serde::Deserialize;
use serde_json::{Value, json};

#[derive(Deserialize)]
struct LogIn {
    email: String,
    password: String
}

struct SignUp {
    name: String,
    email: String,
    password: String
}

async fn signup(Json(data): Json<SignUp>) {
    //
}

#[debug_handler]
async fn login(Json(data): Json<LogIn>) -> Result<Json<Value>, StatusCode> {
    Ok(Json(json!({"auth": "hash"})))
}

pub fn auth() -> Router {
    Router::new()
        .route("/login", get(login))
}
