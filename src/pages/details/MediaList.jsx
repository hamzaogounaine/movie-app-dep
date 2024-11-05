import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MediaListSkeleton from './MediaListSkeleton';

const MediaList = ({ title, media, genres, posterBase, icon: Icon }) => {
  return (
    <div className="px-4 md:px-6">
      <h2 className="text-2xl font-bold text-foreground tracking-tighter sm:text-4xl items-center my-4 flex gap-3">
        {title} </h2>
      <ScrollArea className="w-full h-full whitespace-nowrap rounded-md">
        <div className="flex h-full space-x-4 p-4">
          {!media && (
            <MediaListSkeleton />
          )}
          {media && media.map((item, i) => (
            <Link to={`/${item.media_type || 'movie'}/${item.id}`} key={i} className="relative group w-[200px] overflow-hidden h-full rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img
                alt={`Media poster ${item.title || item.name}`}
                className="object-cover w-full h-full"
                width="200"
                height='300'
                src={`${posterBase}${item.poster_path}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
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