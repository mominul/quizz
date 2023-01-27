import React from "react";
import "./QuizItem.css";
import videoIcon from "../../../assets/images/videoIcon.jpg";

const QuizItem = ({ item }) => {
  return (
    <div className="quizItem">
      <img src={videoIcon} alt="video icon" />
      <h5>
        {" "}
        Video title ( Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Possimus, quidem. )
      </h5>
      <h6>Instructor name</h6>
    </div>
  );
};

export default QuizItem;
