import React from "react";
import { Link } from "react-router-dom";

import LogoEAC from "../../assets/img/EACFlix-netflix.png";
import "./Menu.css";
import Button from "../Button";

function Menu() {
  return (
    <nav className="Menu">
      <Link to="/">
        <img className="Logo" src={LogoEAC} alt="Logo EACFlix" />
      </Link>

      <Button as={Link} className="ButtonLink" to="/insert/video">
        Add new video
      </Button>
    </nav>
  );
}

export default Menu;
