import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PeoplePage from "./people-page/people-page.component.js";

const router = createBrowserRouter([
  {
    path: "/people/:personId",
    element: <PeoplePage />,
  },
  {
    path: "/people",
    element: <PeoplePage />,
    exact: true,
  },
]);

export default function Root(props) {
  return <RouterProvider router={router} />;
}
