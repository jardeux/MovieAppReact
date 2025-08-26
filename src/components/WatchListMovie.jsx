import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
export default function WatchListMovie({ movieObj, removeFromWatchlist }) {
  const { watchList } = useContext(UserContext);

  const isInWatchlist = watchList.some((m) => m.id === movieObj.id);

  return (
    <div className="col">
      <div className="card h-100 position-relative">
        <img
          src={"https://image.tmdb.org/t/p/original/" + movieObj.poster_path}
          className="img-fluid rounded"
          alt="Movie Poster"
        />
        <div>
          <button
            type="button"
            className="btn btn-danger position-absolute top-0 start-0"
            onClick={() => removeFromWatchlist(movieObj)}
          >
            {isInWatchlist ? (
              <i className="bi bi-heart-fill"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
