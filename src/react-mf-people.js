import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  errorBoundary() {
    return <div>Error</div>;
  },
  loadRootComponent: () =>
    import(
      /* webpackChunkName: "people-root-component" */ "./root.component.js"
    ).then((mod) => mod.default),
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

export function getFilmsComponent() {
  return import(
    /* webpackChunkName: "films-component" */ "./films/films.component.js"
  );
}
