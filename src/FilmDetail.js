import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_FILM_DETAILS = gql`
  query GetFilm($id: ID!) {
    film(id: $id) {
      title
      releaseDate
      director
      episodeID
      openingCrawl
      characterConnection {
        characters {
          name
        }
      }
    }
  }
`;

function FilmDetail() {
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_FILM_DETAILS, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.film) {
    return <p>No film data found!</p>;
  }

  const { title, releaseDate, director, episodeID, openingCrawl, characterConnection } = data.film;

  return (
    <div className="film-details">
      <h1>{title}</h1>
      <p>Episode: {episodeID}</p>
      <p>Release Date: {releaseDate}</p>
      <p>Director: {director}</p>
      <p>{openingCrawl}</p>

      <h3>Characters</h3>
      <div className="character-grid">
        {characterConnection.characters.map((character) => (
          <div key={character.name}>{character.name}</div>
        ))}
      </div>
    </div>
  );
}

export default FilmDetail;
