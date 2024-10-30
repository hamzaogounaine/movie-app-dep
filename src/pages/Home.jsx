import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext/authContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CarrotIcon, Clock, Loader, Search, TrendingUp, Tv } from "lucide-react";
import { useMovies } from '../contexts/moviesContext/moviesContext';
import MediaList from './details/MediaList';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TrendingCarousel } from './details/TrendingCarousel';

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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

  return (
    <div className={`bg-background min-h-screen text-foreground ${mode}`}>
      <main className="flex-1">

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-600 dark:bg-slate-700">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
                  Welcome to Film Guild
                </h1>
                <p className="mx-auto max-w-[700px] text-secondary md:text-xl">
                  Discover, watch, and discuss the best films from around the world.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex space-x-2 relative">
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-[300px] h-9 flex-1 text-foreground border-foreground" placeholder="Search movies..." type="search" />
                  <div className='absolute -left-2 top-9  text-foreground text-left bg-background  w-[300px] rounded'>
                    <ScrollArea className='max-h-40 whitespace-nowrap flex flex-col'>

                      {suggestions && suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="cursor-pointer p-2 border-y-[0.2px] border-foreground hover:bg-slate-500" onClick={() => navigate(`/search/query=${suggestion.title || suggestion.name}`)}>
                          <img src={suggestion.poster_path ? `${poster_base}${suggestion.poster_path}` : 'default_image_url'} alt={suggestion.title} className="w-8 h-12 inline-block mr-2" />
                          {suggestion.title || suggestion.name}
                        </div>
                      )
                    )}
                    <ScrollBar orientation="vertical" className="bg-foreground rounded" />

                    </ScrollArea>
                  </div>
                  <Button type="" variant="secondary" onClick={() => navigate(`/search/query=${search}`)}>
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-10 bg-background">
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