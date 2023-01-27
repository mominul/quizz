use axum_project::app;

#[tokio::main]
async fn main() {
    // run it with hyper on localhost:3000
    axum::Server::bind(&"127.0.0.1:8000".parse().unwrap())
        .serve(app().into_make_service())
        .await
        .unwrap();
}