import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import useForm from "../../../hooks/useForm";

function InsertCategory() {
  const initialValues = {
    name: "",
    description: "",
    color: "#c00000",
  };

  const { handleChange, values, clearForm } = useForm(initialValues);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes("localhost")
      ? "http://localhost:8080/categories"
      : "https://eacflix.herokuapp.com/categories";
    fetch(URL).then(async (serverResponse) => {
      const response = await serverResponse.json();
      setCategories([...response]);
    });
  }, []);

  return (
    <>
      <PageDefault>
        <h1>Add new Category: {values.name}</h1>

        <form
          onSubmit={function handleSubmit(eventInfos) {
            eventInfos.preventDefault();

            setCategories([...categories, values]);

            clearForm();
          }}
        >
          <FormField
            label="Category Name"
            type="text"
            name="name"
            value={values.name}
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

          <Button>Insert</Button>
        </form>

        {categories.length === 0 && <div>Loading...</div>}

        <ul>
          {categories.map((category, index) => {
            return <li key={`${category}${index}`}>{category.title}</li>;
          })}
        </ul>

        <Link to="/">Ok, we can go Home now</Link>
      </PageDefault>
    </>
  );
}

export default InsertCategory;
