import { Link } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export default function Movie({ movieObj, type }) {
  /* const movieObj = {
      image: "1.jpg",
      title: "Kaptan Amerika",
      description: "Güzel bir film",
    }; */
  const { theme } = useContext(ThemeContext);
  return (
    <div className="col">
      <div className={`card h-100 shadow movie position-relative bg-${theme}`}>
        <Link to={`/${type}/${movieObj.id}`}>
          <img
            src={
              (type === "person" && movieObj.profile_path) ||
              (type !== "person" && movieObj.poster_path)
                ? "https://image.tmdb.org/t/p/original" +
                  (type === "person"
                    ? movieObj.profile_path
                    : movieObj.poster_path)
                : "/img/noimg.jpg"
            }
            alt={movieObj.title || movieObj.name}
            className="card-img-top"
          />
        </Link>
        <div className="card-body">
          <h2
            className={`h6 card-title text-${
              theme === "dark" ? "light" : "dark"
            }`}
          >
            {type === "movie" ? movieObj.title : movieObj.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
