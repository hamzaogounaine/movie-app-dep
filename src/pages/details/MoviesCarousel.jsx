import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMovies } from "../../contexts/moviesContext/moviesContext";
import { Button } from "@/components/ui/button";
import { Info, PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";


export function MoviesCarousel({ movies }) {
  const [logos, setLogos] = React.useState([])
  const { getLogoOfMovie } = useMovies()
  const poster_base = "https://image.tmdb.org/t/p/original";
  React.useEffect(() => {
    movies.map(el => fetchLogos(el.id))
  }, [movies])
  const fetchLogos = async (id) => {
    const res = await getLogoOfMovie(id);
    setLogos((prevLogos) => [...prevLogos, res.find(el => el.iso_639_1 === 'en')]);
  }

  return (
    <Carousel className="my-2">
      <CarouselContent className='flex flex-row'>
        {movies && movies.map((movie, index) => (
          <CarouselItem key={movie.id} className="">
            <div className="rounded relative flex justify-start items-center ">
              <div className="absolute flex flex-col w-1/3 ms-4 items-center justify-start z-50">
                <img src={`${poster_base}${logos[index]?.file_path}`} width={500} className="mb-3" />
                <p className="text-secondary-foreground font-[poppins] text-lg">{movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}</p>
                <div className="flex justify-start w-full mt-4 gap-4">

                <button className='rounded-md font-bold bg-foreground hover:scale-105 transition-all flex gap-1 float-start p-2 text-background items-center min-w-32 justify-center'><PlayIcon className="fill-background w-6 h-6" />Play</button>
                <Link to={`/movie/${movie.id}`} className='rounded-md font-bold bg-transparent border-2 border-foreground flex gap-1 float-start p-3 hover:scale-105 transition-all min-w-40 justify-center text-foreground items-center'><Info className="text-foreground w-6 h-6" />See more</Link>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent rounded"></div>
              <img src={`${poster_base}${movie.backdrop_path}`} alt="" className="rounded" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}