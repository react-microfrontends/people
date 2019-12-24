import React, { Fragment } from "react";
import { Scoped } from "kremling";
import { getPeople } from "../utils/api.js";
import styles from "./people-list.krem.css";
import { Link, useRouteMatch } from "react-router-dom";

export default function PeopleList({ people, loadingPeople, selectPerson }) {
  const match = useRouteMatch();
  return (
    <Scoped css={styles}>
      <div className="peopleList">
        <Fragment>
          {people.map((person, index) => {
            return (
              <Link
                key={person.name}
                className="person"
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
    </Scoped>
  );
}
