"use client";  
import { useEffect, useState } from "react";
import Link from "next/link";

const API_KEY = "15b980f";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie&type=movie`;
const SEARCH_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setMovies(data.Search || []));
    }, []);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    const toggleFavorite = (movie) => {
        let updatedFavorites = favorites.includes(movie.imdbID)
            ? favorites.filter(id => id !== movie.imdbID)
            : [...favorites, movie.imdbID];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 2) {
            fetch(SEARCH_URL + e.target.value + "&type=movie")
                .then(res => res.json())
                .then(data => setMovies(data.Search || []));
        } else {
            fetch(API_URL)
                .then(res => res.json())
                .then(data => setMovies(data.Search || []));
        }
    };

    return (
        <div className="flex flex-col text-black items-center justify-center bg-gray-100 min-h-screen">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center mt-4 mb-2">Cinema</h1>
            <p className="text-black text-center mb-6">a movie recommendation system</p>
            
            {/* Search Bar with a margin bottom for gap */}
            <input 
                type="text" 
                placeholder="Search movies..." 
                value={searchQuery} 
                onChange={handleSearch} 
                className="p-2 mb-6 w-80 text-lg border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-colors"
            />
            
            {/* Movie Grid with gap from search bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4">
                {movies.map(movie => (
                    <div key={movie.imdbID} className="w-[200px] h-[400px] bg-gray-100 rounded p-4 shadow-md flex flex-col justify-between">
                        <Link href={`/movie/${movie.imdbID}`}>
                            <img src={movie.Poster} alt={movie.Title} className="mx-auto mb-2 w-full h-48 object-cover rounded" />
                        </Link>
                        <p className="font-bold text-center text-xl">{movie.Title}</p>
                        <p className="text-center text-gray-600">{movie.Year}</p>
                        <div className="flex justify-around mt-4">
                            <button 
                                onClick={() => toggleFavorite(movie)} 
                                className="text-sm bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition-colors "
                            >
                                {favorites.includes(movie.imdbID) ? "Remove Favorite" : "Add to Favorites"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
