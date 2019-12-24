import React, { Fragment } from "react";
import queryString from "query-string";
import { find } from "lodash";
import { getPeople } from "../utils/api.js";
import styles from "./people-page.krem.css";
import PeopleList from "../people-list/people-list.component.js";
import SelectedPerson from "./selected-person/selected-person.component.js";
import { useCss } from "kremling";

export default function PeoplePage(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    pageNum: 1,
    nextPage: true,
    loadingPeople: false,
    selectedPerson: undefined,
    people: []
  });

  const { nextPage, loadingPeople, people, selectedPerson, pageNum } = state;
  const scope = useCss(styles);

  React.useEffect(() => {
    if (state.nextPage) {
      dispatch({ type: "loadingPeople" });

      const subscription = getPeople(pageNum).subscribe(
        results => {
          dispatch({ type: "newPeople", results });
        },
        err => {
          console.log("err", err); // eslint-disable-line
        }
      );

      return () => subscription.unsubscribe();
    }
  }, [state.pageNum, state.nextPage, state.people, state.selectedPerson]);

  React.useEffect(() => {
    const search = props.location.search;
    const parsed = queryString.parse(search);

    if (
      (state.selectedPerson === undefined && parsed.selected !== undefined) ||
      (state.selectedPerson &&
        parsed &&
        parsed.selected !== state.selectedPerson.id)
    ) {
      const person = find(state.people, p => p.id === parsed.selected);
      if (person) {
        dispatch({ type: "selectPerson", person });
      }
    }
  }, [props.location.search]);

  return (
    <div className="peoplePage">
      <div className="peoplePageContents">
        <div className="listWrapper">
          {nextPage ? (
            <button
              className="brand-button margin-bottom-16"
              onClick={fetchMore}
              disabled={!nextPage || loadingPeople}
            >
              Fetch More people
            </button>
          ) : null}
          {loadingPeople && people.length === 0 ? (
            <div>Loading ...</div>
          ) : (
            <PeopleList
              people={people}
              loadingPeople={loadingPeople}
              selectPerson={selectPerson}
            />
          )}
        </div>
        <div className="selectedWrapper">
          <div className="selectedPerson">
            <SelectedPerson selectedPerson={selectedPerson} />
          </div>
        </div>
      </div>
    </div>
  );

  function selectPerson(index) {
    dispatch({ type: "selectPersonByIndex", index });
  }

  function fetchMore() {
    dispatch({ type: "fetchMore" });
  }
}

function reducer() {}
