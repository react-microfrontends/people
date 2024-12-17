import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import * as rxjs from "rxjs";

// eslint-disable-next-line no-console
console.log("rxjs", rxjs);

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
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
