use axum::{routing::get, Router, Extension};
use sqlx::PgPool;

mod auth;

async fn hello() -> &'static str {
    "Hello, World!"
}

pub async fn app() -> Router {
    let address = "postgres://postgres:password@localhost:5432/database";

    let pool = PgPool::connect(address).await.unwrap();

    Router::new()
        .route("/", get(hello))
        .nest("/auth", auth::auth())
        .layer(Extension(pool))
}
