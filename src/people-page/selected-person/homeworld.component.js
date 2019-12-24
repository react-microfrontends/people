import React, { Fragment } from "react";
import { getPlanet } from "../../utils/api.js";
import { of } from "rxjs";
import { flatMap, tap } from "rxjs/operators";
import { Link } from "react-router-dom";

export default function Homeworld(props) {
  const [homeworld, setHomeworld] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const subscription = of(props.homeworld)
      .pipe(
        tap(() => {
          setHomeworld(null);
        }),
        flatMap(homeworldUrl => {
          return getPlanet(homeworldUrl.match(/[0-9]+/));
        })
      )
      .subscribe(
        homeworld => setHomeworld({ homeworld }),
        err => {
          console.error(err);
          setError(err);
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, [props.homeworld]);

  return (
    <div className="homeworld">
      {error && <div>Error Loading</div>}
      {homeworld === undefined && !error && <div>... Loading</div>}
      {homeworld && (
        <Link className="brand-link" to={`/planets/${homeworld.id}`}>
          {homeworld.name}
        </Link>
      )}
    </div>
  );
}
