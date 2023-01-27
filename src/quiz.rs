use axum::{http::StatusCode, Json, Router, routing::post};
use axum_auth::AuthBearer;
use serde::Deserialize;
use serde_json::{json, Value};

// {
//     "title": "video title",
//     "url": "video url",
//     "categories": [
//         "category1"
//     ],
//     "questions": [
//         {
//             "question": "Question 1",
//             "option1": "opt 1",
//             "option2": "opt 2",
//             "option3": "opt 3",
//             "option4": "opt 4",
//             "rightAns": "real answer",
//             "explanation": "this is the explanation"
//         }
//     ]
// }

#[derive(Deserialize)]
struct Quiz {
    title: String,
    url: String,
    //questions: Vec<>
}

// struct Question {
//     question: String,

// }

async fn create(AuthBearer(token): AuthBearer, Json(data): Json<Quiz>) -> Result<Json<Value>, StatusCode> {
    Ok(Json(json!({})))
}

pub fn quiz() -> Router {
    Router::new()
        .route("/create", post(create))
}
