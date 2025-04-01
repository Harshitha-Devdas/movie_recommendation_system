"use client";
import { useParams } from "next/navigation";  // Import useParams hook from next/navigation
import { useEffect, useState } from "react";

const API_KEY = "15b980f";

export default function MovieDetail() {
    const { id } = useParams(); // Use useParams to get the dynamic `id`
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
                .then(res => res.json())
                .then(data => setMovie(data));
        }
    }, [id]);

    if (!movie) return(<div className="flex justify-center items-center min-h-screen">
         <p className="text-xl text-gray-600">Loading...</p>
         </div>);
    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8 px-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
                <img src={movie.Poster} alt={movie.Title} className="mx-auto mb-4 w-full h-96 object-cover rounded-md" />
                <h1 className="text-4xl font-bold text-center text-gray-800">{movie.Title}</h1>
                <p className="text-lg text-center text-gray-500 mb-4">{movie.Released}</p>
                <p className="text-xl text-center text-gray-700">{movie.Genre}</p>
                <p className="mt-4 text-lg text-gray-600">{movie.Plot}</p>
                <p className="mt-2 font-semibold text-xl text-gray-800">Actors: {movie.Actors}</p>
                <p className="font-semibold text-xl text-gray-800">IMDB Rating: {movie.imdbRating}</p>

                <div className="mt-6 text-center">
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors text-lg">
                        Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
}
