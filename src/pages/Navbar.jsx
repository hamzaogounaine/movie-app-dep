import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  ChevronDownIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  Tv,
  User2,
} from "lucide-react";
import { useAuth } from "../contexts/authContext/authContext";
import { logOut } from "../firebase/auth";
import { useEffect, useState } from "react";
import { useFirestore } from "../firebase/firestore";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Navbar() {
  const { user, toggleMode, mode } = useAuth();
  const [watchlistItems, setWatchlistItems] = useState([]);
  const { getWatchList } = useFirestore();

  useEffect(() => {
    const fetchWatchList = async () => {
      const { movies, tvShows } = await getWatchList(user && user.uid);
      setWatchlistItems([...movies, ...tvShows]);
    };
    fetchWatchList();
  }, [user, watchlistItems]);

  const logout = async () => {
    await logOut().then(() => {
      console.log("Logged out");
    });
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-opacity-10 backdrop-blur-md bg-secondary border-b border-foreground ${mode}`}>
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png"
            className="h-10 w-10"
          />
          <span className="sm:text-xl font-bold text-secondary-foreground font-[poppins]">
            FILM GUILD
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                Movies
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 flex flex-col gap-1">
              <Link
                to="/movies"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                All movies
              </Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link
                to="/top-rated-movies"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Top rated movies
              </Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link
                to="/ARmovies"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Arabic movies
              </Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link
                to="/animation"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Animation movies
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                TV series
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 flex flex-col gap-1">
              <Link
                to="/tvseries"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                All TV series
              </Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link
                to="/top-rated-tv-shows"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Top rated series
              </Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link
                to="/mini-series"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Mini series
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="max-sm:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-[300px] p-4 bg-background ${mode}`}>
              <div className="relative bg-background">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full bg-background"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              {!user ? (
                <div className="grid gap-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  <Link
                    to="/profile"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="flex gap-2 items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/watchlist"
            className="text-sm relative font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Tv className="w-5 h-5" />
            <span className="absolute bg-red-500 font-[poppins] h-3 w-3 -top-2 rounded-full flex items-center justify-center -right-2 text-xs text-white">{watchlistItems.length}</span>
          </Link>
          <Toggle
            aria-label="Toggle mode"
            className="rounded-full bg-background"
            onClick={() => toggleMode()}
          >
            {mode === "dark" ? (
              <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </Toggle>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`md:hidden bg-background ${mode}`}>
              <div className="grid gap-4 p-4">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <button>Home</button>
                </Link>
                <Accordion type="single" collapsible>
                  <AccordionItem value="movies">
                    <AccordionTrigger className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                      Movies
                    </AccordionTrigger>
                    <AccordionContent className="p-4 flex flex-col gap-1">
                      <Link
                        to="/movies"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        All movies
                      </Link>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <Link
                        to="/top-rated-movies"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        Top rated movies
                      </Link>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <Link
                        to="/ARmovies"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        Arabic movies
                      </Link>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <Link
                        to="/animation"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        Animation movies
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tvseries">
                    <AccordionTrigger className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                      TV series
                    </AccordionTrigger>
                    <AccordionContent className="p-4 flex flex-col gap-1">
                      <Link
                        to="/tvseries"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        All TV series
                      </Link>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <Link
                        to="/top-rated-tv-shows"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        Top rated series
                      </Link>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <Link
                        to="/mini-series"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      >
                        Mini series
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}