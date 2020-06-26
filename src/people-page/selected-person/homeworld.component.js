import React from "react";
import { getPlanet } from "../../utils/api.js";
import { of } from "rxjs";
import { flatMap, tap } from "rxjs/operators";
import { Link } from "react-router-dom";

export default function Homeworld(props) {
  const [homeworld, setHomeworld] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setHomeworld(null);
    const planetNumber = props.homeworld.match(/[0-9]+/);
    const subscription = getPlanet(planetNumber).subscribe(
      setHomeworld,
      (err) => {
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
        <Link className="text-info" to={`/planets/${homeworld.id}`}>
          {homeworld.name}
        </Link>
      )}
    </div>
  );
}
