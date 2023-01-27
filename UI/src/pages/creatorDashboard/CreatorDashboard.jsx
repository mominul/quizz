import React from "react";
import { Helmet } from "react-helmet";
import QuizItem from "../../components/common/QuizItem/QuizItem";
import { AiOutlineTrophy } from "react-icons/ai";
import "./creatordashboard.css";

import userIcon from "../../assets/images/user.jpg";
import { Link } from "react-router-dom";

const CreatorDashboard = () => {
  return (
    <div>
      <Helmet>
        <title>User Profile</title>
      </Helmet>

      <div className="container mt-5 mb-5">
        <div className="profile_top">
          <div>
            <img src={userIcon} alt="user avatar" />
          </div>
          <div className="user_info">
            <h3>Creator Name: Mr A</h3>
            <h4>Total Quiz : 100 </h4>
            {/* <h5> < Ranking: 5</h5> */}
            <h5>
              {/* <AiOutlineTrophy /> Ranking: 5 */}
              <Link to="/create"> Create Quiz </Link>
            </h5>
          </div>
        </div>

        <h5>Total courses takes.</h5>
        <div className="user_taken_courses">
          <Link to="/quiz/10">
            <QuizItem />
          </Link>
          <Link to="/quiz/11">
            <QuizItem />
          </Link>
          <Link to="/quiz/12">
            <QuizItem />
          </Link>
          <Link to="/quiz/13">
            <QuizItem />
          </Link>
          <Link to="/quiz/14">
            <QuizItem />
          </Link>
          <Link to="/quiz/15">
            <QuizItem />
          </Link>
          <Link to="/quiz/16">
            <QuizItem />
          </Link>
          <Link to="/quiz/17">
            <QuizItem />
          </Link>
          <Link to="/quiz/18">
            <QuizItem />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
