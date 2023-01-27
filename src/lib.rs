use axum::{routing::get, Extension, Router};
use axum::http::Method;
use sqlx::{Connection, Executor, PgConnection, PgPool};
use uuid::Uuid;
use tower_http::cors::{Any, CorsLayer};

mod auth;
mod quiz;

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
        // allow `GET` and `POST` when accessing the resource
        .allow_methods([Method::GET, Method::POST])
        // allow requests from any origin
        .allow_origin(Any);

    Router::new()
        .route("/", get(hello))
        .nest("/auth", auth::auth())
        .nest("/quiz", quiz::quiz())
        .layer(Extension(pool))
        .layer(cors)
}
