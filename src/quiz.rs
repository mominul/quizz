use axum_auth::AuthBearer;

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

async fn create(AuthBearer(token): AuthBearer) -> Result<Json<Value>, StatusCode> {
    
}
