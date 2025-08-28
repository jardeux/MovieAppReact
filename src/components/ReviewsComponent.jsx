import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const ReviewsComponent = ({ id, type }) => {
  const [reviews, setReviews] = useState([]);
  const { theme } = useContext(ThemeContext);
  console.log("tema:", theme);

  async function getReview() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log("yorumlar:", data);
      setReviews(data.results || []);
    } catch (error) {
      console.error("Yorumlar alınırken hata oluştu:", error);
      setReviews([]);
    }
  }

  useEffect(() => {
    if (id && type) {
      getReview();
    }
  }, [id, type,theme]);

  return (
    <div className={`container bg-${theme} my-4`}>
      <h4 className={`mb-4 text-${theme === "dark" ? "light" : "dark"}`}>
        Yorumlar
      </h4>
      {reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <div className={`card bg-${theme} mb-3`} key={idx}>
            <div className="card-body">
              <h5
                className={`card-title text-${
                  theme === "dark" ? "light" : "dark"
                }`}
              >
                {review.author}
              </h5>
              <p
                className={`card-text text-${
                  theme === "dark" ? "light" : "dark"
                }`}
              >
                {review.content}
              </p>
              <p
                className={`card-text
                }`}
              >
                <small
                  className={`text-muted text-${
                    theme === "dark" ? "light" : "dark"
                  }`}
                >
                  {new Date(review.created_at).toLocaleDateString("tr-TR")}
                </small>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">Henüz yorum yok.</div>
      )}
    </div>
  );
};

export default ReviewsComponent;
