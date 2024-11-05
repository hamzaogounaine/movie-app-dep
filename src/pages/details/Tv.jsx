import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Calendar, ThumbsUp, Loader, PlusCircle, Clock } from 'lucide-react';
import { useMovies } from '../../contexts/moviesContext/moviesContext';
import { Button } from "@/components/ui/button";
import { CodeSandboxLogoIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../contexts/authContext/authContext';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Cast from './Cast';
import TrailerComponent from './TrailerComponent';
import { useToast } from "@/components/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useFirestore } from '../../firebase/firestore';





const Tv = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const { getTvById, getTvCast, getTvTrailers } = useMovies();
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const { toast } = useToast()
  const { user } = useAuth()
  const { addToWatchList, checkIfInWatchList } = useFirestore()
  const [isInWatchList, setIsInWatchList] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {

    const fetchMovie = async () => {
      const res = await getTvById(id);
      setMovie(res);
      const tvcast = await getTvCast(id);
      setCast(tvcast);
      const tvtrailers = await getTvTrailers(id);
      setTrailers(tvtrailers);
    };
    fetchMovie();
  }, [getTvById, id]);

  useEffect(() => {
    const checkAvailabilty = async () => {
      const checkres = await checkIfInWatchList(user.uid && user.uid, id, 'tvshows')
      console.log(checkres)
      setIsInWatchList(checkres)
    }
    checkAvailabilty()
  }, [isInWatchList, clicked])

  const handleAddToWatchlist = async () => {
    if (!user) {
      return toast({
        title: 'Login',
        description: `Login first to add ${movie?.name || 'this movie'} to watch list`,
        variant: "destructive",
      });
    }
    const data = {
      id: movie.id,
      added_at: Date.now(),
      type: 'tvshow'
    }
    await addToWatchList(user.uid, 'tvshows', data.id, data)
    console.log(

    )
    return toast({
      title: "Added to Watchlist",
      description: `${movie.name} has been added to your watchlist.`,
    })
  }

  const { mode } = useAuth()
  return (
    <>
      {!movie && <p className='h-screen flex justify-center items-center w-full border rounded-md flex-col'><Loader className='animate-spin' />Fetching...</p>}
      {movie && (
        <div className={`${mode} min-h-screen bg-background text-foreground`}>
          {/* Backdrop */}
          <div className="relative h-[50vh] w-full ">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>

          {/* Movie Details */}
          <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Info */}
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl font-bold">{movie.name}</h1>

                  {user && isInWatchList ? (
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Clock className="mr-2 h-4 w-4" /> Already in Watchlist
                    </Button>
                  ) : (
                    <Button
                      onClick={(movie) => { handleAddToWatchlist(movie); setTimeout(() => setClicked(true), 1000) }}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Add to Watchlist
                    </Button>
                  )}
                </div>
                <p className="text-xl text-muted-foreground mb-4">{movie.original_name}</p>


                <div className="mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="font-[poppins] inline-block bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                    >
                      {genre.name || 'Unknown'}
                    </span>
                  ))}
                </div>

                <p className="text-lg mb-6 font-[poppins]">{movie.overview}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Original Language</h3>
                    <p>{movie.original_language.toUpperCase()}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Origin Country</h3>
                    {movie.production_countries.length > 0 && (
                      <img
                        src={`https://flagcdn.com/w320/${movie.production_countries[0].iso_3166_1.toLowerCase()}.png`}
                        width={40}
                        alt={movie.production_countries[0].name}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Vote Count</h3>
                    <p>{movie.vote_count}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Adult</h3>
                    <p>{movie.adult ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full mt-7'>
              <Link to={`/tv/watch/${movie.id}/1/1`}>
                <button className='w-full border-foreground bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-primary-foreground hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 text-white rounded py-2' >Watch now</button>
              </Link>
            </div>
          </div>

          {/* Trailers */}
          <TrailerComponent trailers={trailers} />
          {/* <h2 className="text-2xl font-bold mx-4 text-left">Recommended Movies</h2> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {recommendedTvShows && recommendedTvShows.map((recTvShow) => (
              <Card key={recTvShow.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg">
              <CardHeader>
                        <img
                            src={recTvShow.poster_path ? `https://image.tmdb.org/t/p/original${recTvShow.poster_path}` : '/path/to/fallback-image.jpg'}
                            alt={recTvShow.name}
                            className="w-full h-48 object-cover rounded-t-md"
                        />
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-lg font-semibold">{recTvShow.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">{recTvShow.overview}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm">{recTvShow.vote_average.toFixed(1)}</span>
                        </div>
                        <Button className="bg-primary text-primary-foreground" size="sm">
                            <a href={`/TvDetails/${recTvShow.id}`} className="text-sm">
                                View Details
                                </a>
                                </Button>
                                </CardFooter>
                                </Card>
                                ))}
                                </div> */}

          <div className="container mx-auto px-4 py-8">
            <Cast cast={cast} />
          </div>
        </div>
      )}
    </>
  );
};

export default Tv;