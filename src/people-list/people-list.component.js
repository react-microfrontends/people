import React, { Fragment } from "react";
import { getPeople } from "../utils/api.js";
import { Link, useRouteMatch } from "react-router-dom";

export default function PeopleList({ people, loadingPeople, selectPerson }) {
  const match = useRouteMatch();
  return (
    <div>
      <Fragment>
        {people.map((person, index) => {
          let borderClass = "border-b";
          if (index === 0) {
            borderClass = "border-t border-b";
          } else if (index + 1 === people.length) {
            borderClass = "";
          }
          return (
            <Link
              key={person.name}
              className={`h-12 flex items-center ${borderClass} border-white cursor-pointer no-underline`}
              to={`${match.path}?selected=${window.encodeURIComponent(
                person.id
              )}`}
            >
              {person.name}
            </Link>
          );
        })}
        {loadingPeople && <div>Loading ...</div>}
      </Fragment>
    </div>
  );
}
