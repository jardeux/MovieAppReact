import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import Movie from "../components/Movie";
import PersonMovie from "../components/PersonMovie";

const API_KEY = "b0aefd2c1a775619f9d05eaebc2f45b1"; // Replace with your TMDB API key

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=movie_credits&tv_credits&language=tr-TR`
        );
        const data = await res.json();
        console.log(data);
        setPerson(data);
      } catch (error) {
        setPerson(null);
      }
      setLoading(false);
    };
    fetchPerson();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!person) return <div>Person not found.</div>;

  return (
    <>
      <div
        className={`container py-4 ${
          theme === "dark" ? "bg-dark text-light" : ""
        }`}
      >
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3">
            {person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                className="img-fluid rounded shadow"
                style={{ maxHeight: 350 }}
              />
            ) : (
              <div
                className="bg-secondary rounded d-flex align-items-center justify-content-center"
                style={{ height: 350 }}
              >
                <span className="text-white-50">No Image</span>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <h2 className="mb-3">{person.name}</h2>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item bg-transparent">
                <strong
                  className={`text-${theme === "dark" ? "light" : "dark"}`}
                >
                  Birthday:
                </strong>{" "}
                <div className={`text-${theme === "dark" ? "light" : "dark"}`}>
                  {person.birthday || "Unknown"}
                </div>
              </li>
              {person.deathday && (
                <li className="list-group-item bg-transparent">
                  <strong
                    className={`text-${theme === "dark" ? "light" : "dark"}`}
                  >
                    Deathday:
                  </strong>{" "}
                  <div
                    className={`text-${theme === "dark" ? "light" : "dark"}`}
                  >
                    {person.deathday}
                  </div>
                </li>
              )}
              <li className="list-group-item bg-transparent">
                <strong
                  className={`text-${theme === "dark" ? "light" : "dark"}`}
                >
                  Place of Birth:
                </strong>
                <div className={`text-${theme === "dark" ? "light" : "dark"}`}>
                  {" "}
                  {person.place_of_birth || "Unknown"}
                </div>
              </li>
              <li className="list-group-item bg-transparent">
                <strong
                  className={`text-${theme === "dark" ? "light" : "dark"}`}
                >
                  Known For:
                </strong>{" "}
                {person.known_for_department || "Unknown"}
              </li>
            </ul>
            <div>
              <strong className={`text-${theme === "dark" ? "light" : "dark"}`}>
                Biography:
              </strong>
              <p className="mt-2" style={{ whiteSpace: "pre-line" }}>
                {person.biography || "No biography available."}
              </p>
            </div>
          </div>
        </div>
      </div>
      {person.movie_credits && person.movie_credits.cast.length > 0 && (
        <div className="mt-4 container">
          <h3 className={`text-${theme === "dark" ? "light" : "dark"}`}>
            Known For:
          </h3>
          <div className="row">
            {person.movie_credits.cast.map((movie) => (
              <PersonMovie key={movie.id} movieObj={movie} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PersonDetails;
