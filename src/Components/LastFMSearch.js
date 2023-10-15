import React, { useState } from 'react';
import axios from 'axios';

function LastFMSearch() {
  const [artist, setArtist] = useState('');
  const [topTracks, setTopTracks] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const API_KEY = '12af3de3988cc64768f49b66de9d5718';
  const LAST_FM_BASE_URL = 'https://ws.audioscrobbler.com/2.0';

  const searchArtist = async () => {
    try {
      const artistResponse = await axios.get(
        `${LAST_FM_BASE_URL}/?method=artist.search&artist=${artist}&api_key=${API_KEY}&format=json`
      );

      const artistName = artistResponse.data.results.artistmatches.artist[0].name;
      const topTracksResponse = await axios.get(
        `${LAST_FM_BASE_URL}/?method=artist.gettoptracks&artist=${artistName}&api_key=${API_KEY}&format=json`
      );

      const similarArtistsResponse = await axios.get(
        `${LAST_FM_BASE_URL}/?method=artist.getsimilar&artist=${artist}&api_key=${API_KEY}&format=json`
      );

      setTopTracks(topTracksResponse.data.toptracks.track);
      setSimilarArtists(similarArtistsResponse.data.similarartists.artist);
      setError('');
    } catch (err) {
      setError('Erro ao buscar informações. Verifique o nome do artista e a chave da API.');
    }
  };

  const clearResults = () => {
    setTopTracks([]);
    setSimilarArtists([]);
    setError('');
  };

  const submitFeedback = () => {
    // Aqui você pode enviar o feedback para um servidor ou realizar alguma ação com ele.
    // Por simplicidade, apenas exibirei uma mensagem quando o feedback for enviado.
    setFeedbackSent(true);
  };

  return (
    <div>
      <h1>Consulta à API da Last.fm</h1>
      <input type="text" placeholder="Nome do Artista" onChange={(e) => setArtist(e.target.value)} />
      <button onClick={searchArtist}>Buscar</button>
      <button onClick={clearResults}>Limpar Resultados</button> {/* Botão para limpar resultados */}

      {error && <p>{error}</p>}

      <h2>Principais Faixas do Artista:</h2>
      <ul>
        {topTracks.map((track) => (
          <li key={track.name}>{track.name}</li>
        ))}
      </ul>

      <h2>Artistas Similares:</h2>
      <ul>
        {similarArtists.map((artist) => (
          <li key={artist.name}>{artist.name}</li>
        ))}
      </ul>

      <h2>Feedback do Usuário:</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Deixe seu feedback aqui"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={submitFeedback}>Enviar Feedback</button>

      {feedbackSent && <p>Obrigado pelo seu feedback!</p>}
    </div>
  );
}

export default LastFMSearch;
