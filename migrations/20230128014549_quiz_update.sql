-- Add migration script here
ALTER TABLE quiz
ADD COLUMN title text NOT NULL;
