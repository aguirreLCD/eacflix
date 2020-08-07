import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import useForm from "../../../hooks/useForm";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import videosRepository from "../../../repositories/videos";
import categoriesRepository from "../../../repositories/categories";

function InsertVideo() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const categoryTitles = categories.map(({ title }) => title);
  const { handleChange, values, handleRemoveVideo } = useForm({
    title: "",
    url: "",
    category: "",
  });

  useEffect(() => {
    categoriesRepository.getAllCategories().then((categoriesFromServer) => {
      setCategories(categoriesFromServer);
    });

    videosRepository.getAllVideosWithCategories().then((videosFromServer) => {
      setVideos(videosFromServer);
    });
  }, []);

  return (
    <>
      <PageDefault>
        <h1>Add new video: {values.title}</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const categoryChoosed = categories.find((category) => {
              return category.title === values.category;
            });

            videosRepository
              .createVideoObject({
                title: values.title,
                url: values.url,
                categoryId: categoryChoosed.id,
              })
              .then(() => {
                console.log("well done!");
                history.push("/");
              });
          }}
        >
          <FormField
            label="Video Title"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />

          <FormField
            label="URL"
            type="url"
            name="url"
            value={values.url}
            onChange={handleChange}
          />

          <FormField
            label="Category"
            type="suggestion"
            name="category"
            value={values.category}
            onChange={handleChange}
            suggestions={categoryTitles}
          />

          <Button type="submit">Insert video</Button>
        </form>

        {videos.length === 0 && <div>Loading...</div>}

        <br />
        <br />
        <Link to="/insert/category">You can Add a new category here...</Link>
        <br />
        <br />
        <Link to="/">Or, we can go Home now :)</Link>
        <br />
        <br />

        <ul>
          <h3
            style={{
              margin: "0",
              position: "relative",
              color: "#c00000",
            }}
          >
            ... we already have these Videos registered:
          </h3>
          {videos.map((video) => {
            return (
              <li key={video.id}>
                <span>{video.title}</span>
                <Button
                  style={{
                    position: "relative",
                    width: "40px",
                    height: "40px",
                    border: "none",
                    fontSize: "13px",
                    color: "#c00000",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    console.log(video.id);
                    handleRemoveVideo(event, video.id);
                    history.push("/");
                  }}
                >
                  Remove
                </Button>
              </li>
            );
          })}
        </ul>
      </PageDefault>
    </>
  );
}

export default InsertVideo;
