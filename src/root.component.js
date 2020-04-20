import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PeoplePage from "./people-page/people-page.component.js";

export default function Root(props) {
  return (
    <div className="mt-16">
      <BrowserRouter>
        <Route path="/people/:personId" component={PeoplePage} />
        <Route path="/people" component={PeoplePage} exact />
      </BrowserRouter>
    </div>
  );
}
