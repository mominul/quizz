import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const questionSchema = yup.object({
//   question: yup.string(),
//   options: yup.array().when([], {
//     is: () => "question",
//     then: yup.array().length(4, "Must have to add 4 options"),
//   }),
//   rightAns: yup.string().when([], {
//     is: () => "question",
//     then: yup.string().required("Right answer is required."),
//   }),
//   explanation: yup.string().when([], {
//     is: () => "question",
//     then: yup.string().required("Explanation is required."),
//   }),
// });

const AddQuestion = ({ setValue, getAllValues, setQadded }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [customError, setCustomError] = useState("");
  const {
    register,
    getValues,
    handleChange,

    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(questionSchema),
    mode: "onTouched",
  });

  const handleAddQuestion = (e) => {
    e.preventDefault();

    if (
      getValues("question") &&
      getValues("option1") &&
      getValues("rightAns") &&
      getValues("explanation")
    ) {
      setValue("questions", [
        ...allQuestions,
        {
          ...getValues(),
        },
      ]);
      setAllQuestions([
        ...allQuestions,
        {
          ...getValues(),
        },
      ]);

      setQadded(getAllValues("questions").length);
      reset();
      setCustomError("");
      return;
    }

    setCustomError("Please fill the fields.");
  };

  return (
    <div>
      <form>
        <div className="mb-5 form-group">
          <label htmlFor="videoUrl">Question-{allQuestions?.length + 1}</label>
          <input
            onChange={handleChange}
            {...register("question")}
            //   onChange={(e) => handleAddQuestion(e)}
            //   value={question.question}
            name="question"
            id="videoUrl"
            type="text"
            placeholder="Enter video URL"
            className="form-control"
          />
          <label> Options</label>{" "}
          <input
            //   onChange={handleAddQuestion}
            //   name="options"
            onChange={handleChange}
            {...register("option1")}
            id="option-1"
            type="text"
            placeholder="Enter option"
            className="form-control mb-3"
          />
          <input
            //   onChange={handleAddQuestion}
            //   name="options"
            onChange={handleChange}
            {...register("option2")}
            id="option-2"
            type="text"
            placeholder="Enter option"
            className="form-control mb-3"
          />
          <input
            //   onChange={handleAddQuestion}
            //   name="options"
            onChange={handleChange}
            {...register("option3")}
            id="option-3"
            type="text"
            placeholder="Enter option"
            className="form-control mb-3"
          />
          <input
            //   onChange={handleAddQuestion}
            //   name="options"

            onChange={handleChange}
            {...register("option4")}
            id="option-4"
            type="text"
            placeholder="Enter option"
            className="form-control  mb-4"
          />
          <label>Right Answer</label>
          <input
            //   name="rightAns"
            //   onChange={handleAddQuestion}
            onChange={handleChange}
            {...register("rightAns")}
            className="form-control"
            type="text"
            placeholder="Enter right answer"
            //   value={question.rightAns}
          />
          <label>Explanation</label>
          <textarea
            //   onChange={handleAddQuestion}
            //   value={question.explanation}
            className="form-control"
            onChange={handleChange}
            {...register("explanation")}
            type="text"
            name="explanation"
            placeholder="Enter proper explanation"
          />
        </div>
        <small className="text-danger">{customError ? customError : ""}</small>
        <button
          type="submit"
          onClick={handleAddQuestion}
          className="btn btn-success w-100 mb-3"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
