import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import WatchList from "../components/WatchList";
export default function WatchlistPage() {
  const { watchList, removeFromWatchlist } = useContext(UserContext);
  console.log(watchList);
  return (
    <>
      <WatchList
        movies={watchList}
        title="WatchList"
        removeFromWatchlist={removeFromWatchlist}
      />
    </>
  );
}
