import React, { Fragment } from "react";
import Homeworld from "./homeworld.component.js";
import Films from "../../films/films.component.js";
import PersonAttribute from "./person-attribute.component.js";

export default function SelectedPerson({ selectedPerson }) {
  return (
    <div className="selectedPerson">
      {selectedPerson !== undefined ? (
        <div>
          <PersonAttribute>
            <PersonAttribute.Title>Name</PersonAttribute.Title>
            <PersonAttribute.Value>{selectedPerson.name}</PersonAttribute.Value>
          </PersonAttribute>
          <PersonAttribute>
            <PersonAttribute.Title>Height</PersonAttribute.Title>
            <PersonAttribute.Value>
              {formatHeight(selectedPerson.height)}
            </PersonAttribute.Value>
          </PersonAttribute>
          <PersonAttribute>
            <PersonAttribute.Title>Mass</PersonAttribute.Title>
            <PersonAttribute.Value>{selectedPerson.mass}</PersonAttribute.Value>
          </PersonAttribute>
          <PersonAttribute>
            <PersonAttribute.Title>Hair color</PersonAttribute.Title>
            <PersonAttribute.Value>
              {selectedPerson.hair_color}
            </PersonAttribute.Value>
          </PersonAttribute>
          <PersonAttribute>
            <PersonAttribute.Title>Gender</PersonAttribute.Title>
            <PersonAttribute.Value>
              {selectedPerson.gender}
            </PersonAttribute.Value>
          </PersonAttribute>
          <PersonAttribute>
            <PersonAttribute.Title>Birth year</PersonAttribute.Title>
            <PersonAttribute.Value>
              {selectedPerson.birth_year}
            </PersonAttribute.Value>
          </PersonAttribute>
          <PersonAttribute>
            <PersonAttribute.Title>Homeworld</PersonAttribute.Title>
            <PersonAttribute.Value>
              <Homeworld homeworld={selectedPerson.homeworld} />
            </PersonAttribute.Value>
          </PersonAttribute>
          <PersonAttribute>
            <PersonAttribute.Title>Films</PersonAttribute.Title>
            <PersonAttribute.Value>
              <Films films={selectedPerson.films} />
            </PersonAttribute.Value>
          </PersonAttribute>
        </div>
      ) : (
        <div>No one selected</div>
      )}
    </div>
  );

  function formatHeight(heightInCm) {
    return `${heightInCm}cm (${heightInCm * 0.0328084}ft)`;
  }
}
