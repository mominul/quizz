use axum_project::app;
use tracing::{Level, info};
use tracing_subscriber::FmtSubscriber;

const ADDRS: &str = "127.0.0.1:8000";

#[tokio::main]
async fn main() {
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::DEBUG)
        .finish();

    tracing::subscriber::set_global_default(subscriber)
        .expect("setting default subscriber failed");

    info!("Listening on {ADDRS}");

    // run it with hyper on localhost:3000
    axum::Server::bind(&ADDRS.parse().unwrap())
        .serve(app(false).await.into_make_service())
        .await
        .unwrap();
}
