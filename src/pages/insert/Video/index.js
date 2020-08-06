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
  const categoryTitles = categories.map(({ title }) => title);
  const { handleChange, values } = useForm({
    title: "Default video",
    url: "https://www.youtube.com/watch?v=jEtv9d4MT70",
    category: "Acoustical Engineering",
  });

  useEffect(() => {
    categoriesRepository.getAll().then((categoriesFromServer) => {
      setCategories(categoriesFromServer);
    });
  }, []);

  return (
    <>
      <PageDefault>
        <h1>Add new video</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const categoryChoosed = categories.find((category) => {
              return category.title === values.category;
            });

            videosRepository
              .create({
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
            name="title"
            value={values.title}
            onChange={handleChange}
          />

          <FormField
            label="URL"
            name="url"
            value={values.url}
            onChange={handleChange}
          />

          <FormField
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
            suggestions={categoryTitles}
          />

          <Button type="submit">Insert video</Button>
        </form>

        <br />
        <br />

        <Link to="/insert/category">Add new category</Link>
      </PageDefault>
    </>
  );
}

export default InsertVideo;
