import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import useForm from "../../../hooks/useForm";
import categoriesRepository from "../../../repositories/categories";

function InsertCategory() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const { handleChange, values, handleRemoveCategory } = useForm({
    title: "",
    description: "",
    color: "#c00000",
  });

  useEffect(() => {
    categoriesRepository.getAllCategories().then((categoriesFromServer) => {
      setCategories(categoriesFromServer);
    });
  }, []);

  return (
    <>
      <PageDefault>
        <h1>Add new Category: {values.title}</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            categoriesRepository
              .createCategoryObject({
                title: values.title,
                description: values.description,
                color: values.color,
              })
              .then(() => {
                console.log("well done!");
                history.push("/");
              });
          }}
        >
          <FormField
            label="Category Name"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />

          <FormField
            label="Description"
            type="textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
          />

          <FormField
            label="Color"
            type="color"
            name="color"
            value={values.color}
            onChange={handleChange}
          />

          <Button>Insert category</Button>
        </form>

        {categories.length === 0 && <div>Loading...</div>}

        <ul>
          <h3
            style={{
              margin: "0",
              position: "relative",
              color: "#c00000",
            }}
          >
            ... we already have this Categories registered:
          </h3>
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <span>{category.title}</span>
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
                    console.log(category.id);
                    handleRemoveCategory(event, category.id);
                    history.push("/");
                  }}
                >
                  Remove
                </Button>
              </li>
            );
          })}
        </ul>

        <br />
        <br />

        <Link to="/insert/video">You can Add a new video here</Link>

        <br />
        <br />

        <Link to="/">Or, we can go Home now</Link>
      </PageDefault>
    </>
  );
}

export default InsertCategory;
