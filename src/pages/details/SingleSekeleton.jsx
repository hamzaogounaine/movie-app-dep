import React from 'react'

const SingleSekeleton = ({itemCount}) => {
  return (
    <div>
        {Array.from({ length: itemCount }).map((_, i) => (
            <div key={i} className="relative w-[200px] h-[300px] rounded-lg shadow-lg overflow-hidden">
              <div className="w-full h-full bg-gray-200 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end">
                <div className="p-4 w-full">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            </div>
            ))}
    </div>
  )
}

export default SingleSekeleton