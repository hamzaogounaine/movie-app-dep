import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const MediaList = ({ title, media, genres, posterBase, icon: Icon }) => {
  return (
    <div className="px-4 md:px-6">
      <h2 className="text-2xl font-bold text-foreground tracking-tighter sm:text-4xl items-center my-4 flex gap-3">
        {title} <Icon className='w-10 h-10 text-foreground' />
      </h2>
      <ScrollArea className="w-full h-full whitespace-nowrap rounded-md ">
        <div className="flex h-full space-x-4 p-4">
          {!media && <p className='h-[300px] flex justify-center items-center w-full border rounded-md flex-col'><Loader className='animate-spin' />Fetching...</p>}
          {media && media.map((item, i) => (
            <Link to={`/${item.media_type || 'movie'}/${item.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg">
              <img
                alt={`Media poster ${item.title || item.name}`}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                width="200"
                height='300'
                src={`${posterBase}${item.poster_path}`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white">{item.title || item.name}</h3>
                  <p className="text-sm text-gray-300">{item.release_date || item.first_air_date} | {item.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default MediaList;