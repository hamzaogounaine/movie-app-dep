import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CarrotIcon, Clock, Loader, Search, TrendingUp, Tv } from "lucide-react"
import { useMovies } from '../contexts/moviesContext/moviesContext';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
const Home = () => {
  const { isAuthenticated, user, mode } = useAuth();
  const [trending, setTrending] = useState();
  const [ScFi, setScFi] = useState();
  const [action, setAction] = useState();
  const [drama, setDrama] = useState();
  const [animation, setAnimation] = useState();
  const genres = [
    {
      id: 28,
      name: "Action"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Crime"
    },
    {
      id: 99,
      name: "Documentary"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Family"
    },
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 36,
      name: "History"
    },
    {
      id: 27,
      name: "Horror"
    },
    {
      id: 10402,
      name: "Music"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 10749,
      name: "Romance"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 10770,
      name: "TV Movie"
    },
    {
      id: 53,
      name: "Thriller"
    },
    {
      id: 10752,
      name: "War"
    },
    {
      id: 37,
      name: "Western"
    }
  ]
  const poster_base = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate])

  const { getTrendingMovies, getTrendingMoviesByGenre } = useMovies();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const tren = await getTrendingMovies();
      setTrending(tren);
      const scfi = await getTrendingMoviesByGenre(878);
      setScFi(scfi);
      const actionmovies = await getTrendingMoviesByGenre(28);
      setAction(actionmovies);
      const animationmovies = await getTrendingMoviesByGenre(16);
      setAnimation(animationmovies);
    };

    fetchTrendingMovies();
  }, [getTrendingMovies]);


  return (
    <div className={`bg-background min-h-screen text-foreground ${mode}`}>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-600 dark:bg-slate-700">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
                  Welcome to CineMagic
                </h1>
                <p className="mx-auto max-w-[700px] text-secondary md:text-xl">
                  Discover, watch, and discuss the best films from around the world.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 ">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 text-foreground border-foreground" placeholder="Search movies..." type="search" />
                  <Button type="submit" variant="secondary">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-10 bg-secondary-foreground">
          <div className=" px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl items-center mb-8 flex gap-3">Trending Now <TrendingUp className='w-12 h-12 max-sm:h-10 max-sm:w-10 text-foreground' /></h2>
            <ScrollArea className="w-full  h-full whitespace-nowrap rounded-md border ">
              <div className="flex  h-full space-x-4 p-4">
                {!trending && <p className='h-[300px] flex justify-center items-center w-full'><Loader className='animate-spin' /></p>}
                {trending && trending.map((movie, i) => (
                  <Link to={`/${movie.media_type}/${movie.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg">
                    <img
                      alt={`Movie poster ${movie.title || movie.name}`}
                      className="object-cover  w-full h-full transition-transform group-hover:scale-105"
                      width="200"
                      height='300'
                      src={`${poster_base}${movie.poster_path}`}

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{movie.title || movie.name}</h3>
                        <p className="text-sm text-gray-300">{movie.release_date || movie.first_air_date} | {movie.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')} </p>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className=" px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl items-center my-5 flex gap-3">Science Fiction <Tv className='w-10 h-10 max-sm:h-10 max-sm:w-10 text-foreground' /></h2>
            <ScrollArea className="w-full  h-full whitespace-nowrap rounded-md border ">
              <div iv className="flex  h-full space-x-4 p-4">
              {!ScFi && <p className='h-[300px] flex justify-center items-center w-full'><Loader className='animate-spin' /></p>}

                {ScFi && ScFi.map((movie, i) => (
                  <Link to={`/movie/${movie.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg">

                    <img
                      alt={`Movie poster ${movie.title || movie.name}`}
                      className="object-cover  w-full h-full transition-transform group-hover:scale-105"
                      width="200"
                      height='300'
                      src={`${poster_base}${movie.poster_path}`}

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{movie.title || movie.name}</h3>
                        <p className="text-sm text-gray-300">{movie.release_date || movie.first_air_date} | {movie.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')} </p>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>


        </section>

        <section className="w-full py-10 bg-secondary-foreground">
          <div className=" px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl items-center mb-8 flex gap-3">Action <Clock className='w-12 h-12 max-sm:h-10 max-sm:w-10 text-foreground' /></h2>
            <ScrollArea className="w-full  h-full whitespace-nowrap rounded-md border ">
              <div className="flex  h-full space-x-4 p-4">
                {!action && <p className='h-[300px] flex justify-center items-center w-full'><Loader className='animate-spin' /></p>}
                {action && action.map((movie, i) => (
                  <Link to={`/${movie.media_type}/${movie.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg">
                    <img
                      alt={`Movie poster ${movie.title || movie.name}`}
                      className="object-cover  w-full h-full transition-transform group-hover:scale-105"
                      width="200"
                      height='300'
                      src={`${poster_base}${movie.poster_path}`}

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{movie.title || movie.name}</h3>
                        <p className="text-sm text-gray-300">{movie.release_date || movie.first_air_date} | {movie.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')} </p>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className=" px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl items-center my-5 flex gap-3">Science Fiction <Tv className='w-10 h-10 max-sm:h-10 max-sm:w-10 text-foreground' /></h2>
            <ScrollArea className="w-full  h-full whitespace-nowrap rounded-md border ">
              <div iv className="flex  h-full space-x-4 p-4">
              {!ScFi && <p className='h-[300px] flex justify-center items-center w-full'><Loader className='animate-spin' /></p>}

                {ScFi && ScFi.map((movie, i) => (
                  <Link to={`/movie/${movie.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg">

                    <img
                      alt={`Movie poster ${movie.title || movie.name}`}
                      className="object-cover  w-full h-full transition-transform group-hover:scale-105"
                      width="200"
                      height='300'
                      src={`${poster_base}${movie.poster_path}`}

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{movie.title || movie.name}</h3>
                        <p className="text-sm text-gray-300">{movie.release_date || movie.first_air_date} | {movie.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')} </p>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>


        </section>

        <section className="w-full py-10 bg-secondary-foreground">
          <div className=" px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl items-center mb-8 flex gap-3">Animation <CarrotIcon className='w-12 h-12 max-sm:h-10 max-sm:w-10 text-foreground' /></h2>
            <ScrollArea className="w-full  h-full whitespace-nowrap rounded-md border ">
              <div className="flex  h-full space-x-4 p-4">
                {!animation && <p className='h-[300px] flex justify-center items-center w-full'><Loader className='animate-spin' /></p>}
                {animation && animation.map((movie, i) => (
                  <Link to={`/${movie.media_type}/${movie.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg">
                    <img
                      alt={`Movie poster ${movie.title || movie.name}`}
                      className="object-cover  w-full h-full transition-transform group-hover:scale-105"
                      width="200"
                      height='300'
                      src={`${poster_base}${movie.poster_path}`}

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{movie.title || movie.name}</h3>
                        <p className="text-sm text-gray-300">{movie.release_date || movie.first_air_date} | {movie.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')} </p>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className=" px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-2xl items-center my-5 flex gap-3">Science Fiction <Tv className='w-10 h-10 max-sm:h-10 max-sm:w-10 text-foreground' /></h2>
            <ScrollArea className="w-full  h-full whitespace-nowrap rounded-md border ">
              <div iv className="flex  h-full space-x-4 p-4">
              {!ScFi && <p className='h-[300px] flex justify-center items-center w-full'><Loader className='animate-spin' /></p>}

                {ScFi && ScFi.map((movie, i) => (
                  <Link to={`/movie/${movie.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg">

                    <img
                      alt={`Movie poster ${movie.title || movie.name}`}
                      className="object-cover  w-full h-full transition-transform group-hover:scale-105"
                      width="200"
                      height='300'
                      src={`${poster_base}${movie.poster_path}`}

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{movie.title || movie.name}</h3>
                        <p className="text-sm text-gray-300">{movie.release_date || movie.first_air_date} | {movie.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')} </p>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>


        </section>

      </main>
    </div >
  )
}

export default Home