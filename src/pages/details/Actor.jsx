import React, { useEffect, useState } from 'react'
import { useMovies } from '../../contexts/moviesContext/moviesContext'
import { Link, useParams } from 'react-router-dom'

import { useAuth } from '../../contexts/authContext/authContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ArrowUp, Loader, SearchIcon } from 'lucide-react'
import SingleMovies from './SingleMovies'
const Actor = () => {
    const [movies , setMovies] = useState([])
    const [loading , setLoading] = useState(true)
    const {getMoviesOfActor, getActorNameById} = useMovies()
    const [actorName , setActorName] = useState('')
    const [search , setSearch] = useState('')
    const {id} = useParams()
    const [reset , setReset] = useState(false)
    useEffect(() => {
      setLoading(true)
       const fetchMovies = async () => {
        const res = await getMoviesOfActor(id)
        const name = await getActorNameById(id)
        setActorName(name)
        setMovies(res)
        setLoading(false)
       }
       fetchMovies()
    },[id, reset])
    const {mode} = useAuth()

    useEffect(() => {
      setMovies(movies.filter(movie => movie.title.toString().toLowerCase().includes(search.toLowerCase())))
    }, [search])
    
  return (
    <div className={mode}>
      {loading && <div className='flex justify-center min-h-screen w-full items-center bg-background'><Loader className='animate-spin text-foreground'/></div>}
      {!movies.length && <div className='flex justify-center min-h-screen w-full items-center bg-background'><p className='text-foreground'>No Movies Found</p></div>}
      {!loading && 
        <div className={` px-6 bg-secondary  mx-auto py-10`}>
          <div className='sm:flex justify-evenly'>
            {movies.length && actorName && 
          <h1 className="text-4xl font-bold mb-8 text-center text-foreground">{actorName}'s Movies</h1>
          }
          <div className="relative bg-background h-fit sm:w-1/3 max-sm:my-2">
                <SearchIcon  className="cursor-pointer absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input value={search} type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-8 w-full bg-background text-foreground" />
          {search && <span onClick={() => {setSearch(''), setReset(true) }} className='text-foreground cursor-pointer float-end'>Clear Search</span>}
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies && movies.map((movie) => (
                <SingleMovies key={movie.id} movie={movie} />
            ))}
          </div>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="fixed bottom-7 right-7 bg-primary text-white p-3 rounded-full shadow-lg"
          >
            <ArrowUp size={30} />
          </Button>
        </div>
      }
    </div>
  )
}

export default Actor