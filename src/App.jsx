import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [character, setCharacter] = useState(null);
  const [lastEpisode, setLastEpisode] = useState('');

  function fetchCharacterData(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);
        const episodes = data.episode;
        const lastEpisodeUrl = episodes[episodes.length - 1];

        fetch(lastEpisodeUrl)
          .then(response => response.json())
          .then(episodeData => {
            setLastEpisode(episodeData.name);
          })
          .catch(error => {
            console.error('Erro ao buscar episódio:', error);
          });
      })
      .catch(error => {
        console.error('Erro ao buscar personagem:', error);
      });
  }

  function handleNewCharacter() {
    const randomId = Math.floor(Math.random() * 826) + 1;
    fetchCharacterData(randomId);
  }

  useEffect(() => {
    fetchCharacterData(1);
  }, []);

  return (
    <div className="container">
      <h2>Rick and Morty</h2>

      {character ? (
        <div>
          <img
            className="imgpassaro"
            src={character.image}
            alt={character.name}
          />
          <p><strong>Nome:</strong> {character.name}</p>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Espécie:</strong> {character.species}</p>
          <p><strong>Gênero:</strong> {character.gender}</p>
          <p><strong>Último episódio:</strong> {lastEpisode}</p>
        </div>
      ) : (
        <p>Carregando personagem...</p>
      )}

      <button onClick={handleNewCharacter} className="botao">
        Buscar outro personagem
      </button>
    </div>
  );
}

export default App;
