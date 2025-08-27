import { createContext, use, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const storedWatchlist = localStorage.getItem("watchlist");
  const initialWatchlist = storedWatchlist ? JSON.parse(storedWatchlist) : [];
  const [watchList, setWatchList] = useState(initialWatchlist);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }, [watchList]);

  function addToWatchlist(movie, type) {
    const withType = { ...movie, data_type: type };
    const isAddedToList = watchList.some(
      (i) => i.id === withType.id && i.media_type === withType.media_type
    );

    if (!isAddedToList) {
      setWatchList((e) => [...e, withType]);
    }
  }

  function removeFromWatchlist(movie) {
    setWatchList((prev) => prev.filter((item) => item.id !== movie.id));
  }
  return (
    <UserContext.Provider
      value={{ watchList, setWatchList, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </UserContext.Provider>
  );
}
