import React, { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Movie from "../components/Movie";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
const api_key = "b0aefd2c1a775619f9d05eaebc2f45b1";
const language = "tr-TR";
const page = 1;
const apiUrl = "https://api.themoviedb.org/3";
const SearchResults = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const query = searchParams.get("query");
  console.log("query:", query);

  useEffect(() => {
    async function GetMovies() {
      try {
        const response = await fetch(
          `${apiUrl}/search/multi?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
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
        if (data.results) {
          setMovies(data.results);
        }
        window.scrollTo(0, 0);
        setTotalPages(data.total_pages);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    if (query) {
      GetMovies();
    }
  }, [query, page]); // hem query hem page değişince çalışacak

  // query değiştiğinde page reset
  useEffect(() => {
    setPage(1);
  }, [query]);
  if (errorMessage) return <ErrorMessage message={errorMessage} />;
  return (
    <div className="my-3 container">
      <div className="card">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-film"></i>
          <h2 className="title h3 mb-0">Arama Sonuçları {query}</h2>
        </div>
        <div className="card-body">
          <div className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-4">
            {movies.length === 0 && <p>Film bulunamadı.</p>}
            {movies.map((movie, index) => (
              <Movie key={index} movieObj={movie} type={movie.media_type} />
            ))}
          </div>
        </div>
        <Pagination
          page={Number(page)}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default SearchResults;
