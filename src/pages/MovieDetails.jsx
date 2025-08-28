import React, { useContext, useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { Link, useParams } from "react-router-dom";
import SimilarMovies from "./SimilarComponents";
import ActorCard from "../components/ActorCard";
import SimilarComponents from "./SimilarComponents";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import ReviewsComponent from "../components/ReviewsComponent";
const api_key = import.meta.env.VITE_TMDB_API_KEY;
const language = "tr-TR";
const apiUrl = "https://api.themoviedb.org/3";
const MovieDetails = ({ type }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  const { theme } = useContext(ThemeContext);
  const { addToWatchlist, watchList, removeFromWatchlist } =
    useContext(UserContext);

  const isAddedToList = watchList?.some((u) => u.id === movie?.id);
  useEffect(() => {
    async function GetMovieDetails() {
      try {
        const response = await fetch(
          `${apiUrl}/${type}/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`
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
        if (data) {
          setMovie(data);
        }
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    GetMovieDetails();
  }, [id, type]);
  if (errorMessage) return <ErrorMessage message={errorMessage} />;
  return (
    movie && (
      <>
        <div
          className="text-white position-relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="img-overlay">
            <div className="container d-flex alig-items-center justify-content-center min-vh-100">
              <div className="row mt-5">
                <div className="col-md-3 d-none d-lg-block">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    className="img-fluid rounded img-thumbnail"
                  />
                </div>
                <div className="col-md-9">
                  <h1 className="display-4">
                    {type === "movie" ? movie.title : movie.name}
                  </h1>
                  {type === "tv" && (
                    <p>
                      Yayınlandığı platform:{" "}
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.networks[0]?.logo_path}`}
                        className="img-fluid bg-secondary rounded"
                        style={{
                          width: "50px",
                          height: "auto",
                          marginLeft: "5px",
                          padding: "5px",
                        }}
                      />
                    </p>
                  )}
                  <p>
                    {movie.first_air_date}{" "}
                    <i className="bi bi-dot text-white"></i>
                    <span className="text-white">
                      {movie.genres.map((genre) => genre.name).join(", ")}
                    </span>
                    <i className="bi bi-dot text-white"></i>
                    <span className="text-white">
                      {type === "movie"
                        ? movie.runtime + " dakika"
                        : movie.number_of_seasons +
                          " Sezon" +
                          (movie.number_of_episodes
                            ? `, ${movie.number_of_episodes} Bölüm`
                            : "")}
                    </span>
                  </p>
                  <p>
                    <span className="badge bg-warning fs-6 text-success">
                      {Math.round(movie.vote_average * 10)}%
                    </span>
                    {isAddedToList ? (
                      <button
                        className="badge bg-danger fs-6 ms-2 pointer"
                        onClick={() => removeFromWatchlist(movie)}
                      >
                        <i className="bi bi-heart-fill"></i>
                      </button>
                    ) : (
                      <button
                        className="badge bg-danger fs-6 ms-2 pointer"
                        onClick={() => addToWatchlist(movie, type)}
                      >
                        <i className="bi bi-heart"></i>
                      </button>
                    )}
                  </p>

                  {movie.overview && (
                    <p className="lead">
                      <strong>Özet:</strong> {movie.overview}
                    </p>
                  )}
                  <p>
                    <strong>Yapımcı:</strong>{" "}
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </p>
                  <p>
                    <strong>Yönetmen:</strong>{" "}
                    {movie.credits.crew.find(
                      (member) => member.known_for_department === "Directing"
                    )?.name || "bilinmiyor.."}
                  </p>
                  <p>
                    <strong>Senarist:</strong>{" "}
                    {movie.credits.crew.find(
                      (member) => member.known_for_department === "Writing"
                    )?.name || "bilinmiyor.."}
                  </p>
                  <p>
                    <strong>Kurucu:</strong>{" "}
                    {type === "tv"
                      ? movie.created_by[0]?.name || "bilinmiyor.."
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-3">
          <div className="card">
            <div className={`card-header bg-${theme}`}>
              <h5
                className={`mb-0 text-${theme === "dark" ? "light" : "dark"}`}
              >
                Oyuncular
              </h5>
            </div>
            <div className={`card-body bg-${theme}`}>
              <div className="row">
                {movie.credits?.cast && movie.credits.cast.length > 0 ? (
                  movie.credits.cast
                    .slice(0, 12)
                    .map((actor, index) => (
                      <ActorCard
                        key={`${actor.id}-${index}`}
                        actor={actor}
                        theme={theme}
                      />
                    ))
                ) : (
                  <p className={`text-${theme === "dark" ? "light" : "dark"}`}>
                    Oyuncu bilgisi bulunamadı.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <ReviewsComponent id={id} type={type} />
        <SimilarComponents movieId={movie.id} type={type} />
      </>
    )
  );
  // return (
  //   movie && (
  //     <div className="my-3">
  //       <div className="card">
  //         <div className="card-header d-flex justify-content-between align-items-center">
  //           <h2 className="title h5 mb-0">Film Detayları</h2>
  //           <button className="btn btn-outline-danger fs-5">Kapat</button>
  //         </div>
  //         <div className="card-body">
  //           <div className="row">
  //             <div className="col-md-3">
  //               <img
  //                 src={
  //                   "https://image.tmdb.org/t/p/original/" + movie.poster_path
  //                 }
  //                 alt={movie.title}
  //                 className="img-fluid"
  //               />
  //             </div>
  //             <div className="col-md-9">
  //               <h2>{movie.title}</h2>
  //               <p>{movie.overview}</p>
  //               <div className="row">
  //                 <div className="col-md-3">
  //                   <p>
  //                     <strong>Yayın Tarihi:</strong> {movie.release_date}
  //                   </p>
  //                   <p>
  //                     <strong>Rating:</strong> {movie.vote_average}
  //                   </p>
  //                   (
  //                   <>
  //                     <p>Süre: {loadedMovie.runtime} dakika</p>
  //                     <p>
  //                       Ülke:{" "}
  //                       {loadedMovie.production_countries[0]?.name ||
  //                         "bilinmiyor.."}
  //                     </p>
  //                     <p>
  //                       Yapımcı:{" "}
  //                       {loadedMovie.production_companies[0]?.name ||
  //                         "bilinmiyor.."}
  //                     </p>
  //                     <p>
  //                       Dil:{" "}
  //                       {loadedMovie.spoken_languages[0]?.name ||
  //                         "bilinmiyor.."}
  //                     </p>
  //                     <p>
  //                       Yönetmen:{" "}
  //                       {loadedMovie.credits.crew.find(
  //                         (member) =>
  //                           member.known_for_department === "Directing"
  //                       )?.name || "bilinmiyor.."}
  //                     </p>
  //                     <p>
  //                       Senarist:{" "}
  //                       {loadedMovie.credits.crew.find(
  //                         (member) => member.known_for_department === "Writing"
  //                       )?.name || "bilinmiyor.."}
  //                     </p>
  //                     <p>
  //                       Türler:
  //                       {loadedMovie.genres
  //                         .map((genre) => (
  //                           <div className="badge bg-primary">
  //                             {" "}
  //                             {genre.name}
  //                           </div>
  //                         ))
  //                         .reduce((prev, curr) => [prev, " ", curr])}
  //                     </p>
  //                   </>
  //                   )
  //                 </div>
  //                 <div className="col-md-9">
  //                   <div className="card">
  //                     <div className="card-header">
  //                       <h3>Oyuncular</h3>
  //                     </div>
  //                     <div className="card-body">
  //                       (
  //                       <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
  //                         {loadedMovie.credits.cast
  //                           .map((actor) => (
  //                             <div key={actor.id} className="col">
  //                               <div className="card h-100">
  //                                 <img
  //                                   src={
  //                                     "https://image.tmdb.org/t/p/original/" +
  //                                     actor.profile_path
  //                                   }
  //                                   className="card-img-top"
  //                                   alt={actor.name}
  //                                 />
  //                                 <div className="card-body">
  //                                   <h5 className="card-title">{actor.name}</h5>
  //                                   <p className="card-text">
  //                                     Karakter: {actor.character}
  //                                   </p>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           ))
  //                           .slice(0, 8)}
  //                       </div>
  //                       )
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // );
};

export default MovieDetails;
