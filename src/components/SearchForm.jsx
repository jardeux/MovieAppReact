import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  function handleSubmit(e) {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      // Arama sonuç sayfasına yönlendirme
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setSearchQuery("");
    }
  }

  return (
    <form
      className="d-flex mb-2 mb-lg-0 justify-content-center me-3 ms-auto text-center"
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        className={`form-control me-1 bg-${theme} text-${
          theme === "dark" ? "light" : "dark"
        } placeholder-${theme}`}
        type="search"
        placeholder="Film,dizi,oyuncu ara"
        aria-label="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <button
        className={`btn btn-outline-${
          theme === "dark" ? "light" : "dark"
        } d-flex`}
        type="submit"
      >
        <i className="bi bi-search"></i>
        <span className="ms-2">Ara</span>
      </button>
    </form>
  );
}
