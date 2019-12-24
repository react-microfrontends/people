import React, { Fragment } from "react";
import { useCss } from "kremling";
import { from, of } from "rxjs";
import { tap, mergeMap, switchMap } from "rxjs/operators";
import styles from "./films.krem.css";
import { getFilm } from "../utils/api.js";
import Film from "./film.component.js";

export default function Films(props) {
  const [films, setFilms] = React.useState([]);
  const [error, setError] = React.useState(false);
  const scope = useCss(styles);

  React.useEffect(() => {
    const subscription = of(props.films)
      .pipe(
        switchMap(films => from(films)),
        tap(() => setFilms([])),
        mergeMap(film => {
          return getFilm(film.match(/[0-9]+/));
        })
      )
      .subscribe(film => {
        setFilms(films.concat(film));
      }, setError);

    return () => {
      subscription.unsubscribe();
    };
  }, [props.films, films]);

  return (
    <div className="films" {...scope}>
      {error && <div>Error</div>}
      {films.length !== this.props.films.length && !error && (
        <div>... Loading</div>
      )}
      {films.length === this.props.films.length && !error && (
        <Fragment>
          {films.map(film => {
            return <Film key={film.episode_id} film={film} />;
          })}
        </Fragment>
      )}
    </div>
  );
}
