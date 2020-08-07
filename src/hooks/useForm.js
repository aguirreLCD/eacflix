import { useState } from "react";
import categoriesRepository from "../repositories/categories";

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

  function handleRemove(e, id) {
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

  function clearForm() {
    setValues(initialValues);
  }

  return {
    values,
    handleChange,
    handleRemove,
    clearForm,
  };
}

export default useForm;
