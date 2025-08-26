import Movie from "./Movie";

export default function MovieList({ movies, handleAddWatchList, watchList, setSelectedMovie }) {
  return (
    <div className="my-3">
      <div className="card">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-film"></i>
          <h2 className="title h3 mb-0">Film Listesi</h2>
        </div>
        <div className="card-body">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            {movies.length === 0 && <p>Film bulunamadı.</p>}
            {movies.map((movie, index) => (
              <Movie
                key={index}
                movieObj={movie}
                handleAddWatchList={handleAddWatchList}
                watchList={watchList}
                setSelectedMovie={setSelectedMovie}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
