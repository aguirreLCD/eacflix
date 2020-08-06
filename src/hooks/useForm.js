import { useState } from "react";

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

  function clearForm() {
    setValues(initialValues);
  }

  return {
    values,
    handleChange,
    clearForm,
  };
}

export default useForm;
