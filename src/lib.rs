use axum::{routing::get, Router};

mod auth;

async fn hello() -> &'static str {
    "Hello, World!"
}

pub fn app() -> Router {
    Router::new()
        .route("/", get(hello))
        .nest("/auth", auth::auth())
}
