import React, { useState } from 'react';
import './App.css';

function GithubSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  function handleSearch(event) {
    event.preventDefault();
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setResults(data.items);
      })
      .catch(error => console.error(error));
  }

  return (
    <div className='container'>
      <form className='myForm' onSubmit={handleSearch}>
        <label>
          Search for a GitHub user:
        </label>
        <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        <br></br>
        <button type="submit">Search</button>
      </form>
      <hr></hr>
      <div className='content'>
        {results.map(result => (
          <div className='profile' key={result.id}>
              <img src={result.avatar_url} alt={`${result.login}'s avatar`} />
              <h3>{result.login}</h3>
              <p><a href={result.html_url}>{result.html_url}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GithubSearch;
