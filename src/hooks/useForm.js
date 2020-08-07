import { useState } from "react";
import categoriesRepository from "../repositories/categories";
import videosRepository from "../repositories/videos";

function useForm(initialValues) {
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

  function handleRemoveCategory(e, id) {
    if (window.confirm("Do you really want to delete?")) {
      alert("removing....");
    }

    categoriesRepository
      .removeCategory(id)
      .then(() => {
        alert("removed");
      })
      .catch((e) => {
        alert("sorry!");
      });
  }

  function handleRemoveVideo(e, url) {
    if (window.confirm("Do you really want to delete?")) {
      alert("removing....");
    }

    videosRepository
      .removeVideo(url)
      .then(() => {
        alert("removed");
      })
      .catch((e) => {
        alert("sorry!");
      });
  }

  function clearForm() {
    setValues(initialValues);
  }

  return {
    values,
    handleChange,
    handleRemoveCategory,
    handleRemoveVideo,
    clearForm,
  };
}

export default useForm;
