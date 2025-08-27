import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import WatchListMovie from "./WatchListMovie.jsx";

export default function WatchList({ movies, title, removeFromWatchlist }) {
  console.log(movies);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {
        <div className="container py-3">
          <h1 className={`mb-3 h4 text-${theme === "dark" ? "light" : "dark"}`}>
            {title}
          </h1>
          {movies.length === 0 ? (
            <div className={`col-lg-12 text-${theme === "dark" ? "light" : "dark"}`}>
              İzleme listeniz şu anda boş. Film listesinden dilediğiniz gibi
              ekleme yapabilirsiniz..
            </div>
          ) : (
            <div className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-2">
              {movies.map((movie, index) => (
                <WatchListMovie
                  
                key={index}
                  movieObj={movie}
                  removeFromWatchlist={removeFromWatchlist}
                />
              ))}
            </div>
          )}
        </div>
      }
    </>
  );
}
