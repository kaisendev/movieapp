import React from 'react';

export const SearchBox = ({searchInput, setSearchInput, clearSearchBox, handleDelay}) => {
  return (
    <div>
        <input className='search-box' 
        onChange={(e) => setSearchInput(e.target.value)} 
        value={searchInput} 
        placeholder='Search Movies'>
        </input>
        <button className='search-button' onClick={clearSearchBox}>CLEAR</button>
    </div>
  );
};
