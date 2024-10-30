import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Calendar, ThumbsUp, Scroll, Loader } from 'lucide-react';
import { useMovies } from '../../contexts/moviesContext/moviesContext';
import { Button } from "@/components/ui/button";
import { CodeSandboxLogoIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../contexts/authContext/authContext';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Cast from './Cast';


const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState([]);
  const { getMovieById, getMovieCast } = useMovies();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovieById(id);
      setMovie(res);
      console.log(res);
    };
    fetchMovie();
  }, [getMovieById, id]);

  useEffect(() => {
    const fetchCast = async () => {
      const res = await getMovieCast(id);
      setCast(res);
      console.log(res);
    };
    fetchCast();
  }, [getMovieCast, id]);

  const { mode } = useAuth();
  return (
    <div className={mode}>
      {!movie && <div className='flex justify-center min-h-screen w-full items-center bg-background'><Loader className='animate-spin text-foreground' /></div>}
      {movie && (
        <div className={`${mode} min-h-screen bg-background text-foreground`}>

          {/* Backdrop */}
          <div className="relative h-[50vh] w-full">
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
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">{movie.original_title}</p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <StarFilledIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-1" />
                    <span>{movie.release_date}</span>
                  </div>
                </div>

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
          </div>

          {/* Cast Section */}
          <div className="container mx-auto px-4 py-8">
           <Cast cast={cast} />
          </div>

          {/* <h2 className="text-2xl font-bold mx-4 text-left">Recommended Movies</h2> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {recommendedMovies && recommendedMovies.map((recMovie) => (
            <Card key={recMovie.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg">
              <CardHeader>
                <img
                  src={recMovie.poster_path ? `https://image.tmdb.org/t/p/original${recMovie.poster_path}` : '/path/to/fallback-image.jpg'}
                  alt={recMovie.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold">{recMovie.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">{recMovie.overview}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm">{recMovie.vote_average.toFixed(1)}</span>
                </div>
                <Button className="bg-primary text-primary-foreground" size="sm">
                  <a href={`/MovieDetails/${recMovie.id}`} className="text-sm">
                    View Details
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div> */}
        </div>
      )}
    </div>
  );
};

export default Movie;