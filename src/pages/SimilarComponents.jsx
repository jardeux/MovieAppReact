import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Movie from "../components/Movie";
import { ThemeContext } from "../contexts/ThemeContext";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "tr-TR";
const page = 1;
const apiUrl = "https://api.themoviedb.org/3";
const SimilarComponents = ({ movieId, type }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const { theme } = useContext(ThemeContext);
  window.scrollTo(0, 0);
  useEffect(() => {
    async function GetMovies() {
      try {
        const response = await fetch(
          `${apiUrl}/${type}/${movieId}/similar?api_key=${api_key}&page=${page}&language=${language}`
        );
        if (response.status === 404) {
          throw new Error("Film bulunamadı");
        } else if (response.status === 500) {
          throw new Error("Sunucu hatası");
        } else if (response.status === 429) {
          throw new Error("API limit aşıldı");
        } else if (response.status === 401) {
          throw new Error("API anahtarı geçersiz");
        }
        if (!response.ok) {
          throw new Error("Bir şeyler ters gitti");
        }

        const data = await response.json();
        console.log(data);
        if (data.results) {
          setMovies(data.results);
        }
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    GetMovies();
  }, [movieId]);
  if (errorMessage) return <ErrorMessage message={errorMessage} />;
  return (
    <div className="my-3 container">
      <div className={`card bg-${theme}`}>
        <div className={`card-header d-flex align-items-center gap-2 bg-${theme}`}>
          <i className={`bi bi-film text-${theme === "dark" ? "light" : "dark"}`}></i>
          <h2 className={`title h3 mb-0 text-${theme === "dark" ? "light" : "dark"}`}>
            Benzer {type === "movie" ? "Filmler" : "Diziler"} Listesi
          </h2>
        </div>
        <div className="card-body">
          <div className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-4">
            {movies.length === 0 && <p>Benzer {type === "movie" ? "Filmler" : "Diziler"} bulunamadı.</p>}
            {movies.map((movie, index) => (
              <Movie key={index} movieObj={movie} type={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarComponents;
