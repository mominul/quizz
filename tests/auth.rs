use axum_project::app;
use axum_test_helper::TestClient;
use http::StatusCode;
use serde_json::json;
use tokio::test;

#[test]
async fn auth_login() {
    let client = TestClient::new(app().await);

    let res = client.get("/auth/login").json(&json!({
        "email": "example@abc.com",
        "password": "***"
    })).send().await;

    assert_eq!(res.status(), StatusCode::OK);
}

#[test]
async fn auth_signup() {
    let client = TestClient::new(app().await);

    let res = client.get("/auth/signup").json(&json!({
        "name": "Example",
        "email": "example@abc.com",
        "password": "***",
        "role": "student"
    })).send().await;

    assert_eq!(res.status(), StatusCode::OK);
}
