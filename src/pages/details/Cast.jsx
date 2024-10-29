import { Link } from 'react-router-dom'
import React from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const Cast = ({ cast }) => {
    return (
        cast.length > 0 && (
        <>
         <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <ScrollArea className="w-full h-full whitespace-nowrap rounded-md  ">
            <div className="flex  h-full space-x-4 p-4">
              {cast.map((actor) => (
                  <Link to={`/actor/${actor.id}`} key={actor.id} className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                    alt={actor.name}
                    height={150}
                    width={150}
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                  <p className="text-center text-sm font-semibold">{actor.name}</p>
                  <p className="text-center text-xs text-muted-foreground">{actor.character}</p>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </>)
    )
}

export default Cast