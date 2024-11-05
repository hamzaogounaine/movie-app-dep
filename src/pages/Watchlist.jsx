import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext/authContext";
import { useFirestore } from "../firebase/firestore";
import { useMovies } from "../contexts/moviesContext/moviesContext";
import SingleMovies from "./details/SingleMovies";
import SingleTv from "./details/SingleTv";

const Watchlist = () => {
    const [watchlistItems, setWatchlistItems] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const { user, mode} = useAuth();
    const { getWatchList } = useFirestore();
    const { getMovieById, getTvById } = useMovies();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatchlist = async () => {
            const { movies, tvShows } = await getWatchList(user && user.uid);
            setWatchlistItems([...movies, ...tvShows]);

            // Fetch movie details
            const movieDetails = await Promise.all(movies.map(async (movie) => {
                const movieDetail = await getMovieById(movie.id);
                setLoading(false);
                return movieDetail;
            }));
            setMovies(movieDetails);

            // Fetch TV show details
            const tvShowDetails = await Promise.all(tvShows.map(async (tvShow) => {
                const tvShowDetail = await getTvById(tvShow.id);
                setLoading(false);
                return tvShowDetail;
            }));
            setTvShows(tvShowDetails);
        };

        if (user && user.uid) {
            fetchWatchlist();
        }
    }, [user && user.uid, watchlistItems]);

    return (
        <div>
            <div className={` mx-auto px-8 py-8 bg-background text-foreground ${mode}`}>
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">My Watchlist</h1>
                    <p className="text-muted-foreground">Keep track of movies and shows you want to watch</p>
                </header>
                {loading && (
                    <div className="flex min-h-screen    justify-center items-center h-96">
                        <p className="text-foreground">Loading...</p>
                    </div>
                )}
                {watchlistItems.length === 0 ? (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-foreground">No items in your watchlist</p>
                    </div>
                ):(<>
                <h1 className="text-2xl py-3 text-foreground">Movies</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <SingleMovies key={movie.id} movie={movie} watchlist={true}/>
                    ))}
                </div>
                <h1 className="text-2xl py-3 text-foreground">TV Shows</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tvShows.map((tvShow) => (
                        <SingleTv key={tvShow.id} movie={tvShow} watchlist={true}/>
                    ))}
                </div>
                </>)}
            </div>
        </div>
    )
}

export default Watchlist;