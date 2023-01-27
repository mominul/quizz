import React from "react";
import { useForm } from "react-hook-form";

const AddQuestion = () => {
  const {
    register,
    getValues,
    setValue,
    handleChange,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const handleAddQuestion = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleAddQuestion)}>
        <div className="mb-5 form-group">
          <label htmlFor="videoUrl">Question-1</label>
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
            {...register("option2")}
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
        <button type="submit" className="btn btn-success w-100 mb-3">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
