import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function MoviesCarousel({movies}) {
    const [logos , setLogos] = React.useState([])
    const poster_base = "https://image.tmdb.org/t/p/original";

    const fetchLogos = async () => {
        
    }

  return (
    <Carousel className="w-full h-screen block">
      <CarouselContent className=''>
        {movies && movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center  justify-center p-6">
                  <div>
                    <img src={`${poster_base}${movie.backdrop_path}`} alt="" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}