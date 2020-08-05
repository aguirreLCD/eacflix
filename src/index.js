import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import InsertVideo from "./pages/insert/Video";
import InsertCategory from "./pages/insert/Category";
import NotFound from "./components/NotFound";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/insert/video" component={InsertVideo} />
      <Route path="/insert/category" component={InsertCategory} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
