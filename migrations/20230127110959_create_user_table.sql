-- Add migration script here
CREATE TABLE user (
    user_id serial primary key,
    user_name text,
    user_mail text unique,
    password text,
    user_role varchar(10),
    sub_date date
);
