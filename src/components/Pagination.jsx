import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Pagination = ({ page, totalPages, setPage }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container my-3`}>
      <div className={`card card-body bg-${theme}`}>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary"
            onClick={() => setPage(Number(page) - 1)}
            disabled={page === 1}
          >
            Geri
          </button>
          <span className={`text-${theme === "dark" ? "light" : "dark"}`}>
            Sayfa {page} / {totalPages}
          </span>
          <button className="btn btn-primary"
            onClick={() => setPage(Number(page) + 1)}
            disabled={page === totalPages}
          >
            İleri
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
