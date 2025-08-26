import { createContext, use, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const storedWatchlist = localStorage.getItem("watchlist");
  const initialWatchlist = storedWatchlist ? JSON.parse(storedWatchlist) : [];
  const [watchList, setWatchList] = useState(initialWatchlist);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }, [watchList]);

  function addToWatchlist(movie) {
    const isAddedToList = watchList.map((i) => i.id).includes(movie.id);
    if (!isAddedToList) {
      setWatchList((e) => [...e, movie]);
    }
    return isAddedToList;
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
