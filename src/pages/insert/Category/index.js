import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";

function InsertCategory() {
  const initialValues = {
    name: "",
    description: "",
    color: "#c00000",
  };

  const [categories, setCategories] = useState([]);

  const [values, setValues] = useState(initialValues);

  function setValue(key, value) {
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleChange(eventInfos) {
    setValue(eventInfos.target.getAttribute("name"), eventInfos.target.value);
  }

  useEffect(() => {
    if (window.location.href.includes("localhost")) {
      const URL = `https://eacflix.herokuapp.com/categories`;
      fetch(URL).then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          setCategories(response);
          return;
        }
        throw new Error("error: can't get data");
      });
    }
  }, []);

  return (
    <>
      <PageDefault>
        <h1>Add new Category: {values.name}</h1>

        <form
          onSubmit={function handleSubmit(eventInfos) {
            eventInfos.preventDefault();

            setCategories([...categories, values]);

            setValues(initialValues);
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
