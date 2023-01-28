use axum::{routing::get, Extension, Router};
use axum::http::{Method, HeaderValue};
use axum::http::header::CONTENT_TYPE;
use serde::{Deserialize, Serialize};
use sqlx::{Connection, Executor, PgConnection, PgPool};
use tower_http::trace::{TraceLayer, DefaultMakeSpan};
use uuid::Uuid;
use tower_http::cors::{Any, CorsLayer};

mod auth;
mod quiz;

pub const SALT: &str = "WvEeaZROcLQWtEgP";
pub const JWT_SECRET: &[u8] = b"gtuywdguybdeghgvfeghjwv";

#[derive(Debug, Deserialize, Serialize)]
pub struct Claims {
    sub: i32,
    role: String,
    exp: usize,
}

async fn hello() -> &'static str {
    "Hello, World!"
}

pub async fn app(test: bool) -> Router {
    let address = "postgres://postgres:password@localhost:5432/database";

    let pool = if test {
        let database_name = Uuid::new_v4().to_string();
        let mut connection = PgConnection::connect("postgres://postgres:password@localhost:5432/")
            .await
            .expect("Failed to connect to Postgres");

        connection
            .execute(format!(r#"CREATE DATABASE "{}";"#, database_name).as_str())
            .await
            .expect("Failed to create database.");

        let connection_pool = PgPool::connect(&format!(
            "postgres://postgres:password@localhost:5432/{database_name}",
        ))
        .await
        .expect("Failed to connect to Postgres.");

        sqlx::migrate!("./migrations")
            .run(&connection_pool)
            .await
            .expect("Failed to migrate the database");

        connection_pool
    } else {
        PgPool::connect("postgres://postgres:password@localhost:5432/database")
            .await
            .unwrap()
    };

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_credentials(true)
        .allow_headers([CONTENT_TYPE])
        .allow_methods([Method::GET, Method::POST]);

    Router::new()
        .route("/", get(hello))
        .nest("/auth", auth::auth())
        .nest("/quiz", quiz::quiz())
        .layer(Extension(pool))
        .layer(cors)
        .layer(
            TraceLayer::new_for_http().make_span_with(DefaultMakeSpan::new().include_headers(true)),
        )
}
