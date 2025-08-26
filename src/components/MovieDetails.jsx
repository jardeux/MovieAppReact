import { useEffect, useState } from "react";

const api_key = "b0aefd2c1a775619f9d05eaebc2f45b1";
const query = "dune";
const language = "tr-TR";
const page = 1;

export default function MovieDetails({ movie, onClose }) {
  if (!movie) return null;
  const [loadedMovie, setLoadedMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}&language=${language}&append_to_response=credits`
      );
      const data = await response.json();

      console.log(data);
      setLoadedMovie(data);
    };

    fetchMovieDetails();
  }, [movie.id]);

  return (
    <div className="my-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="title h5 mb-0">Film Detayları</h2>
          <button className="btn btn-outline-danger fs-5" onClick={onClose}>
            Kapat
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <img
                src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
                alt={movie.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-9">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <div className="row">
                <div className="col-md-3">
                  <p>
                    <strong>Yayın Tarihi:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.vote_average}
                  </p>
                  {loadedMovie && (
                    <>
                      <p>Süre: {loadedMovie.runtime} dakika</p>
                      <p>
                        Ülke:{" "}
                        {loadedMovie.production_countries[0]?.name ||
                          "bilinmiyor.."}
                      </p>
                      <p>
                        Yapımcı:{" "}
                        {loadedMovie.production_companies[0]?.name ||
                          "bilinmiyor.."}
                      </p>
                      <p>
                        Dil:{" "}
                        {loadedMovie.spoken_languages[0]?.name ||
                          "bilinmiyor.."}
                      </p>
                      <p>
                        Yönetmen:{" "}
                        {loadedMovie.credits.crew.find(
                          (member) =>
                            member.known_for_department === "Directing"
                        )?.name || "bilinmiyor.."}
                      </p>
                      <p>
                        Senarist:{" "}
                        {loadedMovie.credits.crew.find(
                          (member) => member.known_for_department === "Writing"
                        )?.name || "bilinmiyor.."}
                      </p>
                      <p>
                        Türler:
                        {loadedMovie.genres
                          .map((genre) => (
                            <div className="badge bg-primary">
                              {" "}
                              {genre.name}
                            </div>
                          ))
                          .reduce((prev, curr) => [prev, " ", curr])}
                      </p>
                    </>
                  )}
                </div>
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header">
                      <h3>Oyuncular</h3>
                    </div>
                    <div className="card-body">
                      {loadedMovie && (
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                          {loadedMovie.credits.cast
                            .map((actor) => (
                              <div key={actor.id} className="col">
                                <div className="card h-100">
                                  <img
                                    src={
                                      "https://image.tmdb.org/t/p/original/" +
                                      actor.profile_path
                                    }
                                    className="card-img-top"
                                    alt={actor.name}
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title">{actor.name}</h5>
                                    <p className="card-text">
                                      Karakter: {actor.character}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                            .slice(0, 8)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
