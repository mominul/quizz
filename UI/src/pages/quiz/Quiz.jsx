import React from "react";
import ReactPlayer from "react-player";
import "./quiz.css";

const Quiz = () => {
  return (
    <div>
      <div className="player-wrapper mt-5">
        <ReactPlayer
          pip={true}
          controls={true}
          className="react-player"
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          width="50%"
          height="50%"
        />
      </div>
      <div className="container title_top">
        <h1>Question and Answer </h1>
      </div>

      {Array(5)
        .fill(0)
        .map((item, i) => {
          return (
            <div className="questionAns container mb-5">
              <h4>
                Question one --- Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Natus, id!
              </h4>
              <div className="d-flex justify-content-between">
                <div class="form-check form-check-inline ">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`inlineRadioOptions${i}`}
                    id={`inlineRadio1${i}`}
                    value="option1"
                  />
                  <label class="form-check-label" for={`inlineRadio1${i}`}>
                    Option 1
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`inlineRadioOptions${i}`}
                    id={`inlineRadio2${i}`}
                    value="option2"
                  />
                  <label class="form-check-label" for={`inlineRadio2${i}`}>
                    Option 2
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`inlineRadioOptions${i}`}
                    id={`inlineRadio3${i}`}
                    value="option3"
                  />
                  <label class="form-check-label" for={`inlineRadio3${i}`}>
                    Option 3
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name={`inlineRadioOptions${i}`}
                    id={`inlineRadio4${i}`}
                    value="option3"
                  />
                  <label class="form-check-label" for={`inlineRadio4${i}`}>
                    Option 4
                  </label>
                </div>
              </div>
              <textarea
                className="form-control mt-3"
                name=""
                id=""
                rows="4"
                placeholder="Solution Explanation"
              ></textarea>
            </div>
          );
        })}
    </div>
  );
};

export default Quiz;
