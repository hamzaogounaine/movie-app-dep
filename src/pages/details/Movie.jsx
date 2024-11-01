'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Calendar, Loader, PlusCircle, Clock } from 'lucide-react'
import { useMovies } from '../../contexts/moviesContext/moviesContext'
import { Button } from "@/components/ui/button"
import { StarFilledIcon } from '@radix-ui/react-icons'
import { useAuth } from '../../contexts/authContext/authContext'
import Cast from './Cast'
import TrailerComponent from './TrailerComponent'
import { useToast } from "@/components/hooks/use-toast"
import { useFirestore } from '../../firebase/firestore'


export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [trailers, setTrailers] = useState([])
  const { getMovieById, getMovieCast, getMovieTrailers, addToWatchlist } = useMovies()
  const { mode } = useAuth()
  const { toast } = useToast()
  const { addToWatchList, checkIfInWatchList } = useFirestore()
  const { user } = useAuth()
  const [isInWatchList, setIsInWatchList] = useState(false)
  const [clicked , setClicked] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovieById(id)
      setMovie(res)
    }
    fetchMovie()
  }, [getMovieById, id])

  useEffect(() => {
    const fetchCast = async () => {
      const res = await getMovieCast(id)
      const movietrailers = await getMovieTrailers(id)
      setTrailers(movietrailers)
      setCast(res)
      const checkres = await checkIfInWatchList(user.uid && user.uid, id , 'movies')

      setIsInWatchList(checkres)
    }
    fetchCast()
  }, [getMovieCast, getMovieTrailers, id, isInWatchList])

  useEffect(() => {
    const checkAvailabilty = async () => {
      const checkres = await checkIfInWatchList(user.uid && user.uid, id , 'movies')
      console.log(checkres)
      setIsInWatchList(checkres)
    }
    checkAvailabilty()
  }, [isInWatchList ,clicked ])

  const handleAddToWatchlist = async () => {
    if (!user) {
      return toast({
        title: 'Login',
        description: `Login first to add ${movie?.title || 'this movie'} to watch list`,
        variant: "destructive",
      });
    }
    const data = {
      id: movie.id,
      added_at: Date.now(),
      
    }
    await addToWatchList(user && user.uid, 'movies', data.id, data)
    return toast({
      title: "Added to Watchlist",
      description: `${movie.title} has been added to your watchlist.`,
    })
  }


      if(!movie) {
        return <div className='flex justify-center min-h-screen w-full items-center bg-background'>
        <Loader className='animate-spin text-foreground ' />
      </div>
      }

  return (
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
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              {user && isInWatchList ? (
                <Button
                
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Clock className="mr-2 h-4 w-4" /> Already in watch list
              </Button>
              ) : (
              <Button
              onClick={(movie) => {handleAddToWatchlist(movie); setTimeout(() => setClicked(true), 1000)}}

                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add to Watchlist
              </Button>
            )}
            </div>
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

      {/* Trailers Section */}
      <TrailerComponent trailers={trailers} />

      {/* Cast Section */}
      <div className="container mx-auto px-4 py-8">
        <Cast cast={cast} />
      </div>
    </div >
  )
}