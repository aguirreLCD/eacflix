import React from "react";
import NotFoundImg from "../../assets/img/404dog.png";
import PageDefault from "../PageDefault";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <>
      <PageDefault>
        <Link to="/">
          <img className="imgNotFound" src={NotFoundImg} alt="Page not Found" />
        </Link>
        <h1>Sorry :(</h1>
      </PageDefault>
    </>
  );
}

export default NotFound;
