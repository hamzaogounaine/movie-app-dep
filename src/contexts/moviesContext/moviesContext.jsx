import { createContext, useContext } from "react";
import axios from "axios";
const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const api_key = 'dd725b5608d426a3acd5a0b97d09f4ba';
    const base_url = 'https://api.themoviedb.org/3';

    const getTrendingMovies = async () => {
        const res = await axios.get(`${base_url}/trending/all/day?api_key=${api_key}`);
        return res.data.results;
    }
    const getTrendingMoviesByGenre = async (genre) => {
        const res = await axios.get(`${base_url}/discover/movie?api_key=${api_key}&with_genres=${genre}&sort_by=popularity.desc`);
        return res.data.results;
    }
    const getMovieByQuery = async (query) => {
        const res = await axios.get(`${base_url}/search/movie?api_key=${api_key}&query=${query}`);
        return res.data.results;
    }
    const getMovieById = async (id) => {
        const res = await axios.get(`${base_url}/movie/${id}?api_key=${api_key}`);
        return res.data;
    }
    const getTvById = async (id) => {
        const res = await axios.get(`${base_url}/tv/${id}?api_key=${api_key}`);
        return res.data;
    }
    const getMovieCast = async (id) => {
        const res = await axios.get(`${base_url}/movie/${id}/credits?api_key=${api_key}`);
        return res.data.cast;
    }
    const getTvCast = async (id) => {
        const res = await axios.get(`${base_url}/tv/${id}/credits?api_key=${api_key}`);
        return res.data.cast;
    }
    const getWorksOfActor = async (id) => {
        const movieRes = await axios.get(`${base_url}/person/${id}/movie_credits?api_key=${api_key}`);
        const tvRes = await axios.get(`${base_url}/person/${id}/tv_credits?api_key=${api_key}`);
        return {
            movies: movieRes.data.cast,
            tvShows: tvRes.data.cast
        };
    }
    const getActorNameById = async (id) => {
        const res = await axios.get(`${base_url}/person/${id}?api_key=${api_key}`);
        return res.data.name;
    }
    const getSearchResults = async (query) => {
        const res = await axios.get(`${base_url}/search/multi?api_key=${api_key}&query=${query}`);
        return res.data.results;
    }
    const getMoviesAndSortAndPaginate = async (sortBy, page) => {
        const res = await axios.get(`${base_url}/discover/movie?api_key=${api_key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
        return res.data;
    }
    const getTVAndSortAndPaginate = async (sortBy, page) => {
        const res = await axios.get(`${base_url}/discover/tv?api_key=${api_key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
        return res.data;
    }
    const getSeuggestions = async (query) => {
        const res = await axios.get(`${base_url}/search/multi?api_key=${api_key}&query=${query}`);
        return res.data.results;
    }
    const getArabicMoviesAndSortAndPaginate = async (sortBy, page) => {
        const res = await axios.get(`${base_url}/discover/movie?api_key=${api_key}&language=ar&with_original_language=ar&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
        return res.data;
    }
    const getMiniSeriesWithSortAndPaginate = async (sortBy, page) => {
        const res = await axios.get(`${base_url}/discover/tv?api_key=${api_key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_original_language=en`);
        return res.data;
    }
    const getAnimationMoviesWithSortAndPaginate = async () => {
        const res = await axios.get(`${base_url}/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16`);
        return res.data;
    }
    const getLogoOfMovie = async (id) => {
        const res = await axios.get(`${base_url}/movie/${id}/images?api_key=${api_key}`);
        return res.data.logos;
    }
    const getMovieTrailers = async (id) => {
        const res = await axios.get(`${base_url}/movie/${id}/videos?api_key=${api_key}`);
        return res.data.results.filter(video => video.type === 'Trailer' && video.official);
    }
    const getTvTrailer = async (id) => {
        const res = await axios.get(`${base_url}/tv/${id}/videos?api_key=${api_key}`);
        return res.data.results.filter(video => video.type === 'Trailer' && video.official);
    }
    const getTopRatedMoviesWithPaginateAndSort = async (sortBy, page) => {
        const res = await axios.get(`${base_url}/movie/top_rated?api_key=${api_key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
        return res.data;
    }
    const getTopRatedTvShowsWithPaginateAndSort = async (sortBy, page) => {
        const res = await axios.get(`${base_url}/tv/top_rated?api_key=${api_key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
        return res.data;
    }
    const getMoviesByGenreIdAndSortAndPaginate = async (id, sortBy, page) => {
        const res = await axios.get(`${base_url}/discover/movie?api_key=${api_key}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${id}`);
        return res.data;
    }
    return (
        <MoviesContext.Provider value={{
            getTrendingMovies,
            getTrendingMoviesByGenre,
            getMovieById,
            getTvById,
            getMovieCast,
            getWorksOfActor,
            getActorNameById,
            getSearchResults,
            getTvCast,
            getMoviesAndSortAndPaginate,
            getSeuggestions,
            getArabicMoviesAndSortAndPaginate,
            getTVAndSortAndPaginate,
            getMiniSeriesWithSortAndPaginate,
            getAnimationMoviesWithSortAndPaginate,
            getLogoOfMovie,
            getMovieByQuery,
            getMovieTrailers,
            getTvTrailer,
            getTopRatedMoviesWithPaginateAndSort,
            getTopRatedTvShowsWithPaginateAndSort,
            getMoviesByGenreIdAndSortAndPaginate
        }}>
            {children}
        </MoviesContext.Provider>
    );
}

export const useMovies = () => useContext(MoviesContext);