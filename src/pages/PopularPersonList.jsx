import { use, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router";
import Pagination from "../components/Pagination";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "tr-TR";
const page = 1;
const apiUrl = "https://api.themoviedb.org/3";
export default function PopularPersonList() {
  const { theme } = useContext(ThemeContext);
  const [popularPeople, setPopularPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getPopularPeople() {
      try {
        const response = await fetch(
          `${apiUrl}/person/popular?api_key=${api_key}&page=${page}`
        );
        if (response.ok) {
          const data = await response.json();
          setTotalPages(Math.min(data.total_pages, 10));
          if (data.results) {
            window.scrollTo(0, 0);
            setPopularPeople(data.results);
            console.log(data.results);
          }
        }
      } catch (error) {
        console.error("Error fetching popular people:", error);
      }
    }
    getPopularPeople();
  }, [page]);

  return (
    <div className="container my-4">
      <h2 className={`mb-3 text-${theme === "dark" ? "light" : "dark"}`}>
        Popüler Oyuncular
      </h2>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {popularPeople.map((person) => (
          <div key={person.id} className="col">
            <div
              className={`card h-100 shadow movie position-relative bg-${theme}`}
            >
              <Link to={`/person/${person.id}`} className="stretched-link">
                <img
                  src={
                    person.profile_path
                      ? "https://image.tmdb.org/t/p/original" +
                        person.profile_path
                      : "/img/noimg.jpg"
                  }
                  alt={person.name}
                  className="card-img-top"
                />
              </Link>
              <div className="card-body">
                <h2
                  className={`h6 card-title text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  {person.name}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
