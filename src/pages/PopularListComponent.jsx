import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";
import { ThemeContext } from "../contexts/ThemeContext";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "tr-TR";
const page = 1;
const apiUrl = "https://api.themoviedb.org/3";
const PopularListComponent = ({ type }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function GetComponent() {
      try {
        const response = await fetch(
          `${apiUrl}/${type}/popular?api_key=${api_key}&page=${page}&language=${language}`
        );
        if (response.status === 404) {
          throw new Error("Film veya dizi bulunamadı");
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
          setItems(data.results);
        }
        window.scrollTo(0, 0);
        setTotalPages(Math.min(data.total_pages, 100));
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    GetComponent();
  }, [type, page]);
  if (errorMessage) return <ErrorMessage message={errorMessage} />;
  return (
    <div className="my-3 container">
      <div className="card">
        <div
          className={`card-header bg-${theme} d-flex align-items-center gap-2`}
        >
          <i
            className={`bi bi-film text-${theme === "dark" ? "light" : "dark"}`}
          ></i>
          <h2
            className={`title text-${
              theme === "dark" ? "light" : "dark"
            } h3 mb-0`}
          >
            Popüler {type === "movie" ? "Filmler" : "Diziler"} Listesi
          </h2>
        </div>
        <div className={`card-body bg-${theme}`}>
          <div className="row row-cols-3 row-cols-md-4 row-cols-lg-6 g-4">
            {items.length === 0 && <p>Film veya dizi bulunamadı.</p>}
            {items.map((item, index) => (
              <Movie key={index} movieObj={item} type={type} />
            ))}
          </div>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default PopularListComponent;
