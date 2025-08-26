import React from "react";
import SearchForm from "../components/SearchForm";
import Movies from "./PopularListComponent";
import PopularListComponent from "./PopularListComponent";

const Home = () => {
  return (
    <>
      <div id="home">
        <div className="img-overlay">
          <div className="container pt-5">
            <div className="row">
              <div className="col-12 col-lg-7 mx-auto text-center text-white">
                <h1 className="display-2">Hoş Geldiniz!</h1>
                <p className="lead">
                  Film dünyasına hoş geldiniz! En yeni ve popüler filmleri
                  keşfedin.
                </p>
                <SearchForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopularListComponent type="movie" />
    </>
  );
};

export default Home;
