use axum::{response::IntoResponse, http::StatusCode};
use thiserror::Error;
use tracing::error;

#[derive(Error, Debug)]
pub enum QuizzError {
    #[error("Error form argon2: {0}")]
    ArgonErr(#[from] argon2::Error),
    #[error("Error from sqlx: {0}")]
    SQLError(#[from] sqlx::Error),
    #[error("Error while spawing a blocking task: {0}")]
    SpawnError(#[from] tokio::task::JoinError)
}

impl IntoResponse for QuizzError {
    fn into_response(self) -> axum::response::Response {
        match self {
            QuizzError::ArgonErr(e) => error!("{e}"),
            QuizzError::SQLError(e) => error!("{e}"),
            QuizzError::SpawnError(e) => error!("{e}"),
        }

        StatusCode::INTERNAL_SERVER_ERROR.into_response()
    }
}


