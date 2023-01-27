import React from "react";
import { Helmet } from "react-helmet";
import QuizItem from "../../components/common/QuizItem/QuizItem";
import { AiOutlineTrophy } from "react-icons/ai";
import "./userProfile.css";

import userIcon from "../../assets/images/user.jpg";

const UserProfile = () => {
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
            <h3>User Name: Mr A</h3>
            <h4>Total attempted Exam : 10 </h4>
            {/* <h5> < Ranking: 5</h5> */}
            <h5>
              <AiOutlineTrophy /> Ranking: 5
            </h5>
          </div>
        </div>

        <h5>Total courses takes.</h5>
        <div className="user_taken_courses">
          <Link to="/quiz/10">
            <QuizItem />
          </Link>
          <QuizItem />
          <QuizItem />
          <QuizItem />
          <QuizItem />
          <QuizItem />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
