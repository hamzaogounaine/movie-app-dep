import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext/authContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CarrotIcon, Clock, Loader, Search, TrendingUp, Tv } from "lucide-react";
import { useMovies } from '../contexts/moviesContext/moviesContext';
import MediaList from './details/MediaList';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFirestore } from '../firebase/firestore';
import MediaListSkeleton from './details/MediaListSkeleton';

const Home = () => {
  
  const { isAuthenticated, user, mode } = useAuth();
  const [trending, setTrending] = useState();
  const [ScFi, setScFi] = useState();
  const [action, setAction] = useState();
  const [animation, setAnimation] = useState();
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];
  const poster_base = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [randomBg, setRandomBg] = useState(0);
  const { getWatchList } = useFirestore()


  const { getTrendingMovies, getTrendingMoviesByGenre, getSeuggestions } = useMovies();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const tren = await getTrendingMovies();
      setTrending(tren);
      const scfi = await getTrendingMoviesByGenre(878);
      setScFi(scfi);
      const actionmovies = await getTrendingMoviesByGenre(28);
      setAction(actionmovies);
      const animationmovies = await getTrendingMoviesByGenre(16);
      setAnimation(animationmovies);
      setRandomBg(Math.floor(Math.random() * tren.length));

    };

    fetchTrendingMovies();
  }, [getTrendingMovies, getTrendingMoviesByGenre]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const res = await getSeuggestions(search);
      setSuggestions(res);
    }
    fetchSuggestions()
  }, [search])


  useEffect(() => {
    const fetchWatchList = async () => {

      if (user) {
        await getWatchList(user && user.uid.toString(), 'movies').then(data => console.log(data));
      }
    }
    fetchWatchList()

  }, [user])



  return (
    <div className={`bg-background min-h-screen text-foreground ${mode}`}>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center" title={trending && trending[randomBg] && (trending[randomBg].title || trending[randomBg].name)} style={{ backgroundImage: `url(${trending && trending[randomBg] && trending[randomBg].backdrop_path ? `${poster_base}${trending[randomBg].backdrop_path}` : ''})`, backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="bg-black bg-opacity-5 max-sm:bg-opacity-15 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  Welcome to Film Guild
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Discover, watch, and discuss the best films from around the world.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="flex space-x-2 relative">
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-[300px] h-10 flex-1 text-white border-white rounded-lg shadow-md" placeholder="Search movies or tvshows..." type="search" />
                  <div className='absolute z-50 -left-2 top-10 text-foreground text-left bg-background w-[300px] rounded-lg shadow-lg'>
                    <ScrollArea className='max-h-40 whitespace-nowrap flex flex-col'>
                      {suggestions && suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="cursor-pointer p-2 border-y-[0.2px] border-foreground hover:bg-slate-500" onClick={() => navigate(`/search/query=${suggestion.title || suggestion.name}`)}>
                          <img src={suggestion.poster_path ? `${poster_base}${suggestion.poster_path}` : 'default_image_url'} alt={suggestion.title} className="w-8 h-12 inline-block mr-2 rounded-md" />
                          {suggestion.title || suggestion.name}
                        </div>
                      ))}
                      <ScrollBar orientation="vertical" className="bg-foreground rounded" />
                    </ScrollArea>
                  </div>
                  <Button type="" variant="secondary" onClick={() => navigate(`/search/query=${search}`)} className="rounded-lg shadow-md">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
                <h1 className='text-white text-start'>or browse by genre</h1>
                <div className="flex space-x-2 relative">
                  <Select onValueChange={(value) => navigate(`/genre/${value}`)}>
                    <SelectTrigger className="max-w-[300px] h-10 flex-1 text-white border-white rounded-lg shadow-md bg-transparent">
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre.id} value={genre.id.toString()} className='text-black'>
                          {genre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-background sm:p-4">
          
          <MediaList title="Trending Now" media={trending} genres={genres} posterBase={poster_base} icon={TrendingUp} />
          <MediaList title="Science Fiction" media={ScFi} genres={genres} posterBase={poster_base} icon={Tv} />
          <MediaList title="Action" media={action} genres={genres} posterBase={poster_base} icon={Clock} />
          <MediaList title="Animation" media={animation} genres={genres} posterBase={poster_base} icon={CarrotIcon} />

        </section>
      </main>
    </div>
  );
};

export default Home;