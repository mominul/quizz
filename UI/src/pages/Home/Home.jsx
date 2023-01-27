import React from "react";
import { Link } from "react-router-dom";
import QuizItem from "../../components/common/QuizItem/QuizItem";
import "./home.css";
const Home = () => {
  return (
    <div className="container home_container">
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
      <Link to="/quiz/50">
        <QuizItem />
      </Link>
    </div>
  );
};

export default Home;
