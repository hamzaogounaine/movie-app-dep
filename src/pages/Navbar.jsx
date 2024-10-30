/**
 * v0 by Vercel.
 * @see https://v0.dev/t/obus3LxsAfo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Link} from "react-router-dom"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { ArrowUpToLine, LogOutIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon, User, User2 } from "lucide-react"
import { useAuth } from "../contexts/authContext/authContext"
import { logOut } from "../firebase/auth"

export default function Navbar() {
    const {user , toggleMode, mode} = useAuth()
    const logout = async () =>{
        await logOut().then(() => {console.log('lgoout')})
    }
    
  return (
    <header className={`sticky  top-0 z-50 w-full border-b bg-secondary  border-foreground ${mode}`}>
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2" prefetch={false}>
          <img src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png" className="h-10 w-10" />
         
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Home
          </Link>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <button  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >Movies</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 flex flex-col gap-1">
              <Link to="/movies" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>All movies</Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link to="/ARmovies" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>Arabic movies</Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link to="/animation" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>Animation movies</Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <button  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >TV series</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 flex flex-col gap-1">
              <Link to="/tvseries" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>All TV series</Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link to="/mini-series" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>Mini series</Link>
              <hr className="border-gray-200 dark:border-gray-700" />
              <Link to="/movies" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>Top rated series</Link>
            </DropdownMenuContent>
          </DropdownMenu>
        
          <Link
            to="#"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <SearchIcon className="h-5 w-5  text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-[300px] p-4 bg-background ${mode}`}>
              <div className="relative bg-background">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input type="search" placeholder="Search..." className="pl-8 w-full bg-background" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <User2 className="h-5 w-5 text-gray-500  dark:text-gray-400" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
                {!user ? 
                <div className="grid gap-4">
                    <Link   to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                        Login
                    </Link>
                    <Link   to="/signup" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                        Sign Up
                    </Link>
                </div>:
                <div className="grid gap-4">
                    <Link   to="/profile" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                        Profile
                    </Link>
                    <button   onClick={() => logout()} className="flex gap-2 items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                        <LogOutIcon className="w-4 h-4"/>
                        Logout
                    </button>
                </div>}
            </DropdownMenuContent>

          </DropdownMenu>
          <Toggle aria-label="Toggle mode" className="rounded-full bg-background" onClick={() => toggleMode()}>
            {mode === 'dark' ? <SunIcon  className="h-5 w-5 text-gray-500 dark:text-gray-400" />:
            <MoonIcon  className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
            
          </Toggle>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className={`md:hidden bg-background ${mode}`}>
              <div className="grid gap-4 p-4">
                <Link
                  to="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  to="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  About
                </Link>
                <Link
                  to="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Services
                </Link>
                <Link
                  to="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
