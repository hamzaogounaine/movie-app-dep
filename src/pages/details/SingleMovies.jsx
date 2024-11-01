import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAuth } from '../../contexts/authContext/authContext';
import { useToast } from "@/components/hooks/use-toast";
import { Plus } from 'lucide-react';
import { useFirestore } from '../../firebase/firestore';

const SingleMovies = ({ movie, watchlist }) => {
  const {addToWatchList , removeFromWatchList} = useFirestore();
  const { user } = useAuth();
  const {toast} = useToast();
  const addMovieToWatchList = async (movie) => {
    const data = {
      id: movie.id,
      added_at: Date.now(),
    };
    await addToWatchList(user && user.uid, 'movies', data.id, data);
    return toast({
      title: "Added to Watchlist",
      description: `${movie.title} has been added to your watchlist.`,
    });
  };
  const removeMovieToWatchList = async (movie) => {
    await removeFromWatchList(user && user.uid, 'movies', movie.id.toString());
    return toast({
      title: "Removed ",
      description: `${movie.title} has been from watchlist.`,
    });
  };

  
  const { mode } = useAuth();
  return (
    <div className={mode}>
      <Card className="flex flex-col bg-secondary text-foreground p-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex justify-between items-center">
            <Link to={`/${movie.media_type || 'movie'}/${movie.id}`} key={movie.id}>
              {movie.title || movie.name}
            </Link>
            {!watchlist && (
              <button
                onClick={() => addMovieToWatchList(movie)}
                className="bg-foreground z-50 text-background rounded-full p-1 ml-4"
                title='Add to Watchlist'
              >
                <Plus className="h-6 w-6" />
              </button>
            )}
          </CardTitle>
          <CardDescription>Released: {new Date(movie.release_date || movie.first_air_date).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="relative mb-2">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="object-cover rounded-md w-full h-full"
            />
          </div>
          <Badge className="mb-2 bg-yellow-400 text-black">{movie.vote_average && (movie.vote_average / 2).toFixed(2)}</Badge>
          <ScrollArea className="h-24">
            <p className="text-sm text-muted-foreground">{movie.overview}</p>
            <ScrollBar orientation="vertical" className='rounded' size={1} />
          </ScrollArea>
          {watchlist && (
            <Button onClick={() => removeMovieToWatchList(movie)} variant="destructive" className="mt-2">
              Remove from Watchlist
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleMovies;