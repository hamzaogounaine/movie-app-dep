import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

import { Loader, Search } from 'lucide-react'
import { useMovies } from '../../contexts/moviesContext/moviesContext'
import { useAuth } from '../../contexts/authContext/authContext'
import { Link, useParams } from 'react-router-dom'
import SingleMovies from '../details/SingleMovies'
const SearchPage = () => {
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
    const { query } = useParams()
    const [searchQuery, setQuery] = useState(query.replace('query=', '') || '')
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { getSearchResults, getTrendingMovies } = useMovies()
    const [trending, setTrending] = useState([])
    const { mode } = useAuth()
    useEffect(() => {
        setIsLoading(true)
        const fetchResults = async () => {
            const res = await getSearchResults(searchQuery)
            const trending = await getTrendingMovies()
            setTrending(trending)
            console.log(res)
            setResults(res)
            setIsLoading(false)
        }
        fetchResults()
    }, [searchQuery, query])
    return (
        <div className={mode}>
            <div className="px-8 bg-background mx-auto text-foreground py-8">
                <h1 className="text-3xl  font-bold mb-6">TMDB Movie Search</h1>
                <div className="relative mb-6">
                    <Input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchQuery}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {isLoading && <div className='flex justify-center min-h-screen w-full items-center bg-background'><Loader className='animate-spin text-foreground' /></div>}

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {!results.length && trending.map((movie) => (
                        <SingleMovies key={movie.id} movie={movie} />
                    ))}
                    {results.map((movie) => (
                        <SingleMovies key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPage