import React from 'react';

export const MovieList = (props) => {

const FavoriteComponent = props.favoriteComponent

  return (
      <>
        {props.movies.map((movie) => (
            <div className="image-container" key={movie.imdbID}>
                <img className='movie-image' src={movie.Poster} alt="" />
                <div 
                  className="overlay"
                  onClick={ () => props.handleFavoritesClick(movie)}>
                    <FavoriteComponent />
                </div>
            </div>
        ))}
      </>
  )
};

