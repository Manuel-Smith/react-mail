import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = "http://www.omdbapi.com?apikey=5f1e74a9";

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') searchMovies(searchTerm); }}
        />
        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies.length ? (
        <div className="container">
          { 
            movies.map((movie)=>(
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          }
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
