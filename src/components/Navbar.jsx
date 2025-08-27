import { NavLink, Link } from "react-router";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import ThemeChange from "./ThemeChange.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
export default function Navbar() {
  const { theme } = useContext(ThemeContext);
  const { watchList } = useContext(UserContext);
  console.log(theme);
  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark" ? "bg-dark" : "bg-light"
      } border-bottom border-body`}
      data-bs-theme={theme}
    >
      <div className="container">
        <Logo />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex text-center flex-column flex-lg-row">
            <li className="nav-item mx-lg-2 my-1 my-lg-0">
              <NavLink className="nav-link" aria-current="page" to="/">
                Ana Sayfa
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                Popüler Filmler
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/popular-tv">
                Popüler Diziler
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/upcoming">
                Yakında Vizyonda
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/popular-people">
                Popüler Kişiler
              </NavLink>
            </li>
          </ul>
          <SearchForm />
          <div className="d-flex text-center align-items-center justify-content-center">
            <Link
              to="/watchlist"
              className={`btn btn-${
                theme === "dark" ? "dark" : "light"
              } border position-relative me-3`}
            >
              <i className="bi bi-heart-fill"></i>
              <span className="position-absolute top-0 start-100 badge rounded-pill bg-danger translate-middle">
                {watchList.length}
              </span>
            </Link>
            <ThemeChange />
            {/* <div className="ms-2 d-flex gap-2">
              <Link
                to="/login"
                className={`btn btn-${
                  theme === "dark" ? "dark" : "light"
                } border`}
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className={`btn btn-${
                  theme === "dark" ? "dark" : "light"
                } border`}
              >
                Kayıt Ol
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
