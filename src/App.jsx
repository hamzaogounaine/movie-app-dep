import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Profile from './pages/auth/Profile';
import Movie from './pages/details/Movie';
import Tv from './pages/details/Tv';
import Actor from './pages/details/Actor';
import SearchPage from './pages/search/Search';
import MovieBrowser from './pages/Movies';
import TvBrowser from './pages/Tv';
import MiniSeries from './pages/MiniSeries';
import Animation from './pages/Animation';
import TopRatedMovies from './pages/TopRatedMovies';
import TopRatedTvShows from './pages/TopTvSeries';
import Genre from './pages/Genre';
import Watchlist from './pages/Watchlist';
import MovieWatch from './pages/watch/Movie';
import TvWatch from './pages/watch/TvShow';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/actor/:id" element={<Actor />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/tvseries" element={<TvBrowser />} />
        <Route path="/movies" element={<MovieBrowser />} />
        <Route path="/top-rated-movies" element={<TopRatedMovies />} />
        <Route path="/top-rated-tv-shows" element={<TopRatedTvShows />} />
        <Route path="/genre/:id" element={<Genre />} />
        <Route path="/mini-series" element={<MiniSeries />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/watch/:id" element={<MovieWatch />} />
        <Route path="/tv/watch/:id" element={<TvWatch />} />
        <Route path="/tv/watch/:id/:season/:episode" element={<TvWatch />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;