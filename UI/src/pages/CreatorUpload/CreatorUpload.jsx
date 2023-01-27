import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./creatorupload.css";
import * as yup from "yup";
import Select from "react-select";

import AddQuestion from "./componetns/AddQuestion";

const options = [
  { label: "category1", value: "category1" },
  { label: "category2", value: "category2" },
];

const topSchema = yup.object({
  title: yup.string().required("Video title is required."),
  url: yup.string().required("Video url is required."),
  categories: yup.array(yup.string()).min(1),
});

const CreatorUpload = () => {
  const [totalQadded, setTotalQAdded] = useState(0);

  const {
    register,
    getValues,
    setValue,
    handleChange,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(topSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      url: "",
      categories: ["category1"],
      questions: [],
    },
  });

  const handleSubmitController = (data) => {
    console.log(data);

    reset();
  };

  return (
    <div>
      <div className="container video_upload">
        <h1 className=" mt-5 mb-4">Upload video and Questions</h1>
        <form onSubmit={handleSubmit(handleSubmitController)}>
          <div className=" form-group">
            <label htmlFor="title">Video Title</label>
            <input
              onChange={handleChange}
              {...register("title")}
              className="form-control"
              id="title"
              type="text"
              placeholder="Enter video title"
            />
            <small className="text-danger">
              {errors.title ? errors.title.message : ""}
            </small>
          </div>

          <div className=" form-group">
            <label htmlFor="videoUrl">Video URL</label>
            <input
              onChange={handleChange}
              {...register("url")}
              id="videoUrl"
              type="text"
              placeholder="Enter video URL"
              className="form-control"
            />
            <small className="text-danger">
              {errors.url ? errors.url.message : ""}
            </small>
          </div>

          <div className="basic_dropdown_upper">
            <label>Select video category</label>

            <Controller
              control={control}
              defaultValue={options.map((c) => c.value)}
              name="categories"
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  inputRef={ref}
                  value={options.filter((c) => value.includes(c.value))}
                  onChange={(val) => onChange(val.map((c) => c.value))}
                  options={options}
                  isMulti
                />
              )}
            />
            <small className="text-danger">
              {errors.categories ? errors.categories.message : ""}
            </small>
          </div>

          <div className="mt-4 add_questions_indicator">
            {/* <h4>Add questions --- {questionNum}</h4> */}
            <h5>Add questions </h5>
            <h5> Question added= {totalQadded} </h5>
          </div>

          <AddQuestion
            setValue={setValue}
            getAllValues={getValues}
            setQadded={setTotalQAdded}
          />

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default CreatorUpload;
