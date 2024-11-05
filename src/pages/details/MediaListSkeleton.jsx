'use client'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function MediaListSkeleton({ itemCount = 7 }) {
  return (
    <div className="">
      <ScrollArea className="w-full h-full whitespace-nowrap rounded-md">
        <div className="flex h-full space-x-4 p-4">
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}