import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PeoplePage from "./people-page/people-page.component.js";

export default class Root extends React.Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? (
      <div className="mt-16">Error Loading people application</div>
    ) : (
      <div className="mt-16">
        <BrowserRouter>
          <Route path="/people" component={PeoplePage} />
        </BrowserRouter>
      </div>
    );
  }
}
