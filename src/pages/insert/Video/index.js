import React from "react";
import PageDefault from "../../../components/PageDefault";
import { Link } from "react-router-dom";

function InsertVideo() {
  return (
    <>
      <PageDefault>
        <h1>Add new video</h1>
        <Link to="/insert/category">Add new category</Link>
      </PageDefault>
    </>
  );
}

export default InsertVideo;
