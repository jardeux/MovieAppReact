import { Link } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export default function PersonMovie({ movieObj }) {
  /* const movieObj = {
      image: "1.jpg",
      title: "Kaptan Amerika",
      description: "Güzel bir film",
    }; */
  const { theme } = useContext(ThemeContext);
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 mb-3">
      <div className={`card h-100 shadow movie position-relative bg-${theme}`}>
        <Link to={`/movie/${movieObj.id}`}>
          <img
            src={"https://image.tmdb.org/t/p/original" + movieObj.poster_path}
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
            {movieObj.title}
          </h2>
        </div>
      </div>
    </div>
  );
}
