import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home";
import Movies from "./pages/PopularListComponent";
import MovieDetails from "./pages/MovieDetails";
import MainLayout from "./layouts/MainLayout";
import UpcomingPages from "./pages/UpcomingPages";
import SearchResults from "./pages/SearchResults";
import PopularListComponent from "./pages/PopularListComponent";
import WatchlistPage from "./pages/WatchList";
import Register from "./pages/Register";
import Login from "./pages/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies", element: <PopularListComponent type="movie" /> },
      { path: "/movie/:id", element: <MovieDetails type="movie" /> },
      { path: "/upcoming", element: <UpcomingPages /> },
      { path: "/search", element: <SearchResults /> },
      { path: "/popular-tv", element: <PopularListComponent type="tv" /> },
      { path: "/tv/:id", element: <MovieDetails type="tv" /> },
      { path: "/watchlist", element: <WatchlistPage /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
