import React, { Fragment } from "react";
import { useCss } from "kremling";
import { from, of, forkJoin } from "rxjs";
import { tap, mergeMap, switchMap, mergeAll, map } from "rxjs/operators";
import styles from "./films.krem.css";
import { getFilm } from "../utils/api.js";
import Film from "./film.component.js";

export default function Films(props) {
  const [films, setFilms] = React.useState([]);
  const [error, setError] = React.useState(false);
  const scope = useCss(styles);

  React.useEffect(() => {
    setFilms([]);

    const subscription = forkJoin(
      props.films.map(film => {
        const filmNumber = film.match(/[0-9]+/);
        return getFilm(filmNumber);
      })
    ).subscribe(setFilms, setError);

    return () => {
      subscription.unsubscribe();
    };
  }, [props.films]);

  return (
    <div className="films" {...scope}>
      {error && <div>Error</div>}
      {films.length !== props.films.length && !error && <div>... Loading</div>}
      {films.length === props.films.length && !error && (
        <Fragment>
          {films.map(film => {
            return <Film key={film.episode_id} film={film} />;
          })}
        </Fragment>
      )}
    </div>
  );
}
