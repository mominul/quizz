import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./creatorupload.css";
import * as yup from "yup";
import Select from "react-select";
import shortid from "shortid";
import ReactTagInput from "@pathofdev/react-tag-input";

const options = [
  { label: "red", value: "red" },
  { label: "green", value: "green" },
];

const dummyData = {
  title: "",
  url: "",
  category: "",
  questions: [
    {
      question: "",
      options: ["a", "b", "c", "d"],
      rightAns: "",
      explanation: "",
    },
    {
      question: "",
      options: ["a", "b", "c", "d"],
      rightAns: "",
      explanation: "",
    },
    {
      question: "",
      options: ["a", "b", "c", "d"],
      rightAns: "",
      explanation: "",
    },
    {
      question: "",
      options: ["a", "b", "c", "d"],
      rightAns: "",
      explanation: "",
    },
  ],
};

const CreatorUpload = () => {
  const [questionNum, setQuestionNum] = useState(0);
  const [questionsNum, setQuestionsNum] = useState([]);

  const [ans, setAns] = useState([
    {
      options: [],
    },
  ]);

  //   const [tags, setTags] = useState([
  //     { id: "Thailand", text: "Thailand" },
  //     { id: "India", text: "India" },
  //     { id: "Vietnam", text: "Vietnam" },
  //     { id: "Turkey", text: "Turkey" },
  //   ]);

  const [data, setData] = useState(dummyData);
  const handleChange = (e, parent) => {
    if (e?.name == "category") {
      setData({
        ...data,

        category: e.value,
      });
    } else if (e?.target?.name?.includes("question")) {
      const index = e.target.name.split("-");

      setData({
        ...data,

        questions: [
          {
            ...questions[parseInt(index[1])],
            question: e.target.value,
          },
        ],
      });
    } else if (e.target.name.includes("option")) {
      setData({
        ...data,

        [e.target.name]: {
          ...data[parent],
          options: {
            [e.target.name]: e.target.value,
          },
        },
      });
    } else {
      setData({
        ...data,

        [e.target.name]: e.target.value,
      });
    }
  };

  //   const {
  //     register,
  //     getValues,
  //     setValue,
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({

  //     mode: "onTouched",
  //   });

  const increaseQuestionHandler = () => {
    setQuestionNum(questionNum + 1);

    setQuestionsNum(Array(questionNum + 1).fill(0));
  };
  const decreaseQuestionHandler = () => {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
      setQuestionsNum(Array(questionNum - 1).fill(0));
    }
  };

  const handleSubmitController = (e) => {
    e.preventDefault();
    console.log(data);
    setData(dummyData);
  };

  return (
    <div>
      <div className="container video_upload">
        <h1 className=" mt-5 mb-4">Upload video and Questions</h1>
        <form onSubmit={handleSubmitController}>
          <div className=" form-group">
            <label htmlFor="title">Video Title</label>
            <input
              value={data.title}
              onChange={handleChange}
              name="title"
              className="form-control"
              id="title"
              type="text"
              placeholder="Enter video title"
            />
          </div>

          <div className=" form-group">
            <label htmlFor="videoUrl">Video URL</label>
            <input
              onChange={handleChange}
              name="url"
              value={data?.url}
              //   {...register("url")}
              id="videoUrl"
              type="text"
              placeholder="Enter video URL"
              className="form-control"
            />
          </div>

          <div className="basic_dropdown_upper">
            <label>Select video category</label>

            {/* <Controller
              control={control}
              defaultValue={options.map((c) => c.value)}
              name="options"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  inputRef={ref}
                  value={options.filter((c) => value.includes(c.value))}
                  onChange={(val) => onChange(val.map((c) => c.value))}
                  options={options}
                  isMulti
                />
              )}
            /> */}

            <Select
              onChange={(choice) =>
                handleChange({ name: "category", value: choice.value })
              }
              className="basic_dropdown"
              classNamePrefix="select"
              defaultValue={options[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="category"
              options={options}
            />
          </div>

          <div className="mt-4 add_questions_indicator">
            <h4>Add questions --- {questionNum}</h4>
            <div>
              <button onClick={decreaseQuestionHandler}>-</button>
              <button onClick={increaseQuestionHandler}>+</button>
            </div>
          </div>

          {questionsNum.map((item, i) => {
            return (
              <div key={shortid.generate()} className="mb-5 form-group">
                <label htmlFor="videoUrl">Question {i + 1}</label>
                <input
                  onChange={handleChange}
                  value={data.questions[i].question}
                  name={`question-${i}`}
                  id="videoUrl"
                  type="text"
                  placeholder="Enter video URL"
                  className="form-control"
                />
                <label> Options</label>{" "}
                <input
                  onChange={(e) => handleChange(e, `question${i + 1}`)}
                  name="option-1"
                  id="option-1"
                  type="text"
                  placeholder="Enter option"
                  className="form-control mb-3"
                />
                <input
                  onChange={handleChange}
                  name="option-2"
                  id="option-2"
                  type="text"
                  placeholder="Enter option"
                  className="form-control mb-3"
                />
                <input
                  onChange={handleChange}
                  name="option-3"
                  id="option-3"
                  type="text"
                  placeholder="Enter option"
                  className="form-control mb-3"
                />
                <input
                  onChange={handleChange}
                  name="option-4"
                  id="option-4"
                  type="text"
                  placeholder="Enter option"
                  className="form-control  mb-4"
                />
                {/* <ReactTagInput
                  name="tags"
                  tags={[]}
                  onChange={(newTags) => handleChange(newTags, event)}
                  removeOnBackspace={true}
                /> */}
                {/* <TagsInput
                  onChange={handleChange}
                  style={{ width: "450px" }}
                  value=""
                  name="options"
                  placeHolder="Enter options"
                /> */}
                {/* <Controller
                  name="suggestions"
                  control={control}
                  render={({
                    field: { onChange, onBlur, name, value, ref },
                  }) => (
                    <ReactTags
                      classNames="form-control"
                      tags={tags}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      inputFieldPosition="bottom"
                      autocomplete
                    />
                  )}
                /> */}
                <label>Right Answer</label>
                <input
                  onChange={(choice) => handleChange(choice.value)}
                  name="rightAns"
                  className="form-control"
                  type="text"
                  placeholder="Enter right answer"
                />
                <label>Explanation</label>
                <textarea
                  onChange={handleChange}
                  className="form-control"
                  //   {...register("explanation")}
                  type="text"
                  name="explanation"
                  placeholder="Enter proper explanation"
                />
              </div>
            );
          })}

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default CreatorUpload;
