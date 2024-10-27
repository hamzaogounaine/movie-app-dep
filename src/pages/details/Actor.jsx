import React, { useEffect, useState } from 'react'
import { useMovies } from '../../contexts/moviesContext/moviesContext'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from '../../contexts/authContext/authContext'
import { Loader } from 'lucide-react'
const Actor = () => {
    const [movies , setMovies] = useState([])
    const [loading , setLoading] = useState(true)
    const {getMoviesOfActor, getActorNameById} = useMovies()
    const [actorName , setActorName] = useState('')
    const {id} = useParams()
    useEffect(() => {
       const fetchMovies = async () => {
        const res = await getMoviesOfActor(id)
        const name = await getActorNameById(id)
        setActorName(name)
        setMovies(res)
        setLoading(false)
       }
       fetchMovies()
    })
    const {mode} = useAuth()
  return (
    <div className={mode}>
            {loading && <div className='flex justify-center min-h-screen w-full items-center bg-background'><Loader className='animate-spin text-foreground'/></div>}
    {!loading && 
        <div className={` px-6 bg-secondary-foreground mx-auto py-10`}>
      <h1 className="text-4xl font-bold mb-8 text-center text-foreground">{actorName && actorName}'s Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies && movies.map((movie) => (
            <Link to={`/movie/${movie.id}`}>

          <Card key={movie.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
              <CardDescription>Released: {new Date(movie.release_date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="aspect-[2/3] relative mb-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
              <Badge className="mb-2">{movie.character}</Badge>
              <ScrollArea className="h-24">
                <p className="text-sm text-muted-foreground">{movie.overview}</p>
              </ScrollArea>
            </CardContent>
           
          </Card>
            </Link>
        ))}
      </div>
    </div>}
    </div>
  )
}

export default Actor