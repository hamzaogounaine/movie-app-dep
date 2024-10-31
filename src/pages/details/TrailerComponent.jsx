import { PlayCircleIcon } from 'lucide-react'
import React from 'react'

const TrailerComponent = ({trailers}) => {
  return (
   
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mx-4 text-left">Trailers</h2>
    {!trailers.length && <p className="text-center text-foreground mt-5">No trailers found</p>}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {trailers && trailers.map((trailer) => (
        <div key={trailer.id} className="bg-white rounded dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg">
          <div className="relative">
            <img
              src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
              alt={trailer.name}
              className="w-full h-52 object-cover rounded-t-md"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className=" ">
                <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer" className="text-sm">
                  <PlayCircleIcon className=' text-red-500' size={40}/>
                </a>
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{trailer.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">{trailer.type}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default TrailerComponent