use axum::{http::StatusCode, Json, Router, routing::post, Extension};
use axum_auth::AuthBearer;
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};
use serde::Deserialize;
use serde_json::{json, Value};
use sqlx::{PgPool, query};

use crate::{JWT_SECRET, Claims};

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
    questions: Vec<Question>
}

#[derive(Deserialize)]
struct Question {
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    rightAns: String,
    explanation: String,
}

async fn create(AuthBearer(token): AuthBearer, Extension(pool): Extension<PgPool>, Json(data): Json<Quiz>) -> Result<Json<Value>, StatusCode> {
    let claim = decode::<Claims>(
        &token,
        &DecodingKey::from_secret(JWT_SECRET),
        &Validation::new(Algorithm::HS512),
    ).unwrap().claims;

    if claim.role != "creator" {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let quiz_id = query!("INSERT INTO quiz (title, video_link, user_id) values ($1, $2, $3) RETURNING quiz_id;", data.title, data.url, claim.sub).fetch_one(&pool).await.map_err(|x| StatusCode::INTERNAL_SERVER_ERROR)?;
    let quiz_id = quiz_id.quiz_id;

    for q in data.questions {
        let ques_id = query!("INSERT INTO questions (question, option1, option2, option3, option4, answer, solve, quiz_id ) values($1, $2 , $3, $4, $5, $6 , $7, $8) RETURNING question_id;", q.question, q.option1, q.option2, q.option3, q.option4, q.rightAns, q.explanation, quiz_id).fetch_one(&pool).await.map_err(|x| StatusCode::INTERNAL_SERVER_ERROR)?;
    }

    Ok(Json(json!({})))
}

pub fn quiz() -> Router {
    Router::new()
        .route("/create", post(create))
}
