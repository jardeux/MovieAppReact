import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Movie from "../components/Movie";
import UpcomingMovies from "../components/upcomingMovie";
import { ThemeContext } from "../contexts/ThemeContext";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "tr-TR";
const page = 1;
const apiUrl = "https://api.themoviedb.org/3";
const UpcomingPages = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [error, setError] = useState(null);

  const {theme} = useContext(ThemeContext);
  useEffect(() => {
    GetUpcomingMovies();
  }, []);

  async function GetUpcomingMovies() {
    try {
      const response = await fetch(
        `${apiUrl}/movie/upcoming?api_key=${api_key}&language=${language}&page=${page}`
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
        setUpcomingMovies(data.results);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <div className="my-3 container">
      <div className="card">
        <div className={`card-header d-flex align-items-center gap-2 bg-${theme}`}>
          <i className={`bi bi-film text-${theme === "dark" ? "light" : "dark"}`}></i>
          <h2 className={`title h3 mb-0 text-${theme === "dark" ? "light" : "dark"}`}>Yakında Vizyonda Listesi</h2>
        </div>
        <div className={`card-body bg-${theme}`}>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
            {upcomingMovies.length === 0 && <p>Film bulunamadı.</p>}
            {upcomingMovies.map((movie, index) => (
              <UpcomingMovies key={index} movieObj={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPages;
