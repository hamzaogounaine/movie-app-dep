import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useAuth } from '../../contexts/authContext/authContext'

const SingleMovies = ({movie}) => {
  const {mode} = useAuth()
  return (
    <div className={mode}>
        <Link to={`/${movie.media_type || 'movie'}/${movie.id}`} key={movie.id} >
                <Card className="flex flex-col bg-secondary text-foreground p-0">
                  <CardHeader>
                    <CardTitle className=" text-lg font-bold">{movie.title || movie.name}</CardTitle>
                    <CardDescription>Released: {new Date(movie.release_date || movie.first_air_date).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className=" relative mb-2">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                    <Badge className="mb-2 bg-yellow-400 text-black">{movie.vote_average && movie.vote_average.toFixed(2)/2}</Badge>
                    
                    <ScrollArea className="h-24">
                      <p className="text-sm text-muted-foreground">{movie.overview}</p>
                      <ScrollBar orientation="vertical" className=' rounded' size={1} />

                    </ScrollArea>
                  </CardContent>
                </Card>
              </Link>
    </div>
  )
}

export default SingleMovies