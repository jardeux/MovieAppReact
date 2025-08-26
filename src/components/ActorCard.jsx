import { Link } from "react-router-dom";
import { memo } from "react";

const ActorCard = memo(({ actor, theme }) => {
  // actor.id'nin var olduğundan emin olalım
  if (!actor || !actor.id) {
    return null;
  }

  return (
    <div className="col-md-2">
      <Link to={`/person/${actor.id}`} className="text-decoration-none">
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
            : "/img/noimg.jpg"
        }
        alt={actor.name}
        className="img-fluid rounded"
      />
      </Link>
      <p className={`text-${theme === "dark" ? "light" : "dark"}`}>
        {actor.name}
      </p>
    </div>
  );
});

ActorCard.displayName = "ActorCard";

export default ActorCard;
