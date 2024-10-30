'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Film, Search, Star } from 'lucide-react'
import { useMovies } from '../contexts/moviesContext/moviesContext'
import SingleMovies from './details/SingleMovies'
import { useAuth } from '../contexts/authContext/authContext'
import SingleTv from './details/SingleTv'

// Note: In a real application, you would store this in an environment variable


export default function TvBrowser() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const {getTVAndSortAndPaginate} = useMovies()
  const {mode} = useAuth()

  useEffect(() => {
    fetchMovies(sortBy , currentPage)
  }, [sortBy, currentPage])

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMovies(filtered)
  }, [searchTerm, movies])

  const fetchMovies = async (sortBy , currentPage) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTVAndSortAndPaginate(sortBy, currentPage)
      setMovies(data.results)
      setFilteredMovies(data.results)
      setTotalPages(data.total_pages)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className={`bg-background text-foreground mx-auto px-4 py-8 ${mode}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">TV series Browser</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <Select onValueChange={handleSortChange} defaultValue={sortBy}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity.desc">Popularity Descending</SelectItem>
            <SelectItem value="popularity.asc">Popularity Ascending</SelectItem>
            <SelectItem value="vote_average.desc">Rating Descending</SelectItem>
            <SelectItem value="vote_average.asc">Rating Ascending</SelectItem>
            <SelectItem value="release_date.desc">Release Date Descending</SelectItem>
            <SelectItem value="release_date.asc">Release Date Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Film className="animate-spin h-12 w-12 text-primary" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies && filteredMovies.map((movie) => (
              <SingleTv key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="px-4 py-2 mx-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}