import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Heading } from './components/Heading';
import { MovieList } from './components/MovieList';
import { SearchBox } from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

function App() {
  const [movies, setMovies] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [favorites, setFavorites] = useState([])

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=fc6cf9cc`
    const response = await fetch(url)
    const responseJson = await response.json()
    
    if(responseJson.Search){
      console.log(responseJson.Search)
      setMovies(responseJson.Search)
    }
  }

 /* const handleDelay = (e) => {
    setSearchInput(e.target.value)
    let timeout = null
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      getMovieRequest(searchInput)
    },1000)
  }*/

  useEffect(() => {
   getMovieRequest(searchInput)
  },[searchInput])

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('movie-favorites')) || []
    setFavorites(movieFavorites)
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-favorites', JSON.stringify(items))
  }

  const addFavoriteMovie = (movie) => {

    if(favorites.length === 0){
      setFavorites([...favorites, movie])
      saveToLocalStorage(favorites)
    }
    else{
      const filtered = favorites.filter((favMovie) => {
        return favMovie.imdbID !== movie.imdbID;
      })
      setFavorites([...filtered, movie])
      saveToLocalStorage(favorites)
    }
  }

  const removeFavoriteMovie = (movie) => {
    const newFavouriteList = favorites.filter((favorite) => {
      return favorite.imdbID !== movie.imdbID
    })
    setFavorites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const clearSearchBox = () => {
    setMovies([])
    setSearchInput('')
  }

  return (
    <div className="App">

      <br></br>
      <Heading headStyle={"movie-title"} heading={"Movie App"}/>

      <br></br>
      <SearchBox searchInput={searchInput} 
      setSearchInput={setSearchInput}
      clearSearchBox={clearSearchBox}
      />

      <br></br>
      <div className='movie-container'>
        <MovieList 
        handleFavoritesClick={addFavoriteMovie}
        movies={movies} 
        favoriteComponent={AddFavorites}/>
      </div>
      
      <div>{ favorites.length === 0 ? <Heading headStyle={"fav-title"} heading={"No Favorites"}/> : <Heading headStyle={"fav-title"} heading={"Favorites"}/>}</div>
      
      <br></br>
      <div className='movie-container'>
        <MovieList 
        movies={favorites} 
        handleFavoritesClick={removeFavoriteMovie}
        favoriteComponent={RemoveFavorites}/>
      </div>
    </div>
  );
}

export default App;
