-- Add migration script here
CREATE TABLE quiz (
    quiz_id serial primary key,
    video_link text,
    user_id serial,
    foreign key (user_id) references userr
);

CREATE TABLE questions(
    question_id serial primary key,
    question text,
    option1 text,
    option2 text,
    option3 text,
    option4 text,
    answer text,
    solve text,
    quiz_id serial,
    foreign key (quiz_id) references quiz
);


CREATE TABLE solved(
    solve_id serial primary key,
    user_id serial,
    question_id serial,
    showed_solution boolean not null,
    foreign key (user_id) references userr,
    foreign key (question_id) references questions
);