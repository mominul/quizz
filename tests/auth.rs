use axum_project::app;
use axum_test_helper::TestClient;
use http::StatusCode;
use serde_json::json;
use tokio::test;

#[test]
async fn auth_login() {
    let client = TestClient::new(app(true).await);

    let res = client.post("/auth/login").json(&json!({
        "email": "example@abc.com",
        "password": "***"
    })).send().await;

    assert_eq!(res.status(), StatusCode::NOT_FOUND);
}

#[test]
async fn auth_signup() {
    let client = TestClient::new(app(true).await);

    let res = client.post("/auth/signup").json(&json!({
        "name": "Example",
        "email": "example@abc.com",
        "password": "pppp",
        "role": "student"
    })).send().await;

    assert_eq!(res.status(), StatusCode::OK);
}

#[test]
async fn auth_persist() {
    let client = TestClient::new(app(true).await);

    client.post("/auth/signup").json(&json!({
        "name": "Example",
        "email": "example@abc.com",
        "password": "pppp",
        "role": "student"
    })).send().await;

    let res = client.post("/auth/login").json(&json!({
        "email": "example@abc.com",
        "password": "pppp"
    })).send().await;

    assert_eq!(res.status(), StatusCode::OK);
}
