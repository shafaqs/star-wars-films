import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// Map of film titles to poster URLs 
const filmPosters = {
  "A New Hope": "https://www.themoviedb.org/t/p/w1280/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  "The Empire Strikes Back": "https://www.themoviedb.org/t/p/w1280/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg",
  "Return of the Jedi": "https://www.themoviedb.org/t/p/w1280/jQYlydvHm3kUix1f8prMucrplhm.jpg",
  "The Phantom Menace": "https://www.themoviedb.org/t/p/w1280/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg",
  "Attack of the Clones": "https://www.themoviedb.org/t/p/w1280/oZNPzxqM2s5DyVWab09NTQScDQt.jpg",
  "Revenge of the Sith": "https://www.themoviedb.org/t/p/w1280/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg",
};

const GET_FILMS = gql`
  query GetFilms {
    allFilms {
      films {
        id
        title
        releaseDate
        director
        episodeID
      }
    }
  }
`;

function FilmsList() {
  const { loading, error, data } = useQuery(GET_FILMS);
  const [sortBy, setSortBy] = useState('title');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const films = data.allFilms.films;

  const sortedFilms = [...films].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'releaseDate') return new Date(a.releaseDate) - new Date(b.releaseDate);
    if (sortBy === 'episodeID') return a.episodeID - b.episodeID;
    return 0;
  });
  return (
    <div>
      <h1>Star Wars Films</h1>
      <div className="sort-container">  {/* Added this div */}
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="releaseDate">Release Date</option>
          <option value="episodeID">Episode Number</option>
        </select>
      </div>
      <ul>
        {sortedFilms.map((film) => (
          <li key={film.id}>
            <Link to={`/film/${film.id}`}>
              <h3>{film.title} (Episode {film.episodeID})</h3>
            </Link>
            <p>Release Date: {film.releaseDate}</p>
            <p>Director: {film.director}</p>
            <img
              src={filmPosters[film.title] || 'https://link-to-default-poster.jpg'}
              alt={`${film.title} poster`}
              style={{ width: '200px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );

}

export default FilmsList;
