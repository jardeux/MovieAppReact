// function component oluşturduk ve App isimli bir fonksiyon oluşturduk.
//app isimli fonksiyonu çağırdık ve Header isimli fonksiyonu çağırdık.
import Footer from "./components/Footer";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import SearchForm from "./components/SearchForm";
import WatchList from "./components/WatchList";
import WatchListButton from "./components/WatchListButton";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

const api_key = "b0aefd2c1a775619f9d05eaebc2f45b1";
const language = "tr-TR";
const page = 1;

export default function App2() {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuary, setSearchQuary] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  // USE EFFECT NEDEN KULLANDIK ÇÜNKÜ BİZ APİDEN VERİ ÇEKİP USE STATE KULLANIRSAK STATE GÜNCELLENDİĞİ İÇİN Bİ DAHA RENDER OLCAKTI
  // VE APİ SÜREKLİ RENDER OLCAKTI AMA USE EFFECT KULLANDIĞIMIZ İÇİN BİR KERE RENDER OLCAK VE APİDEN VERİ ÇEKCEK SONDAKİ KARELİ PARENTEZ
  // İSE DİYELİM İSWATCHLİSTOPEN YAZDIK eğer o state set olursa aynı zamanda useeffectteki de render olcaktı  VE 2. KEZ RENDER OLACAKTI DENEYTELİM CONSOLA BAKALIM
  useEffect(() => {
    async function GetMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuary}&language=${language}&page=${page}`
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
        console.log(data);
        if (data.results) {
          setMovies(data.results);
        }
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    if (searchQuary.length < 3) {
      setMovies([]);
      return;
    }
    GetMovies();
  }, [searchQuary]);

  

  function handleAddWatchList(movie) {
    const isAddedToList = watchList.some((m) => m.id == movie.id);
    if (!isAddedToList) {
      setWatchList((e) => [...e, movie]);
    } else {
      setWatchList((e) => e.filter((m) => m.id != movie.id));
    }
  }

  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }
  return (
    <>
      <Header>
        <Logo />
        <SearchForm setSearchQuary={setSearchQuary} searchQuary={searchQuary} />
        <WatchListButton
          watchList={watchList}
          setIsWatchListOpen={setIsWatchListOpen}
          isWatchListOpen={isWatchListOpen}
        />
      </Header>
      <Main>
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
        <WatchList
          watchList={watchList}
          isWatchListOpen={isWatchListOpen}
          handleAddWatchList={handleAddWatchList}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {!errorMessage && (
          <MovieList
            movies={movies}
            handleAddWatchList={handleAddWatchList}
            watchList={watchList}
            setSelectedMovie={handleSelectedMovie}
          />
        )}
      </Main>
      <Footer />
    </>
  );
}
