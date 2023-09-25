import React, { useState, useEffect } from 'react'; // Importa o React e hooks (useState, useEffect) do React.
import axios from 'axios'; // Importa a biblioteca axios para fazer solicitações HTTP.

function LastFMSearch() {
  // Definição dos estados iniciais usando o useState:

  const [artist, setArtist] = useState(''); // Armazena o nome do artista digitado pelo usuário.
  const [topTracks, setTopTracks] = useState([]); // Armazena as principais faixas do artista.
  const [similarArtists, setSimilarArtists] = useState([]); // Armazena artistas similares ao artista pesquisado.
  const [error, setError] = useState(''); // Armazena mensagens de erro.
  const [feedback, setFeedback] = useState(''); // Armazena o feedback do usuário.
  const [feedbackSent, setFeedbackSent] = useState(false); // Indica se o feedback foi enviado com sucesso.
  const [loading, setLoading] = useState(false); // Indica se uma solicitação está em andamento.

  // Chave de API da Last.fm para autenticação.
  const API_KEY = '12af3de3988cc64768f49b66de9d5718';

  // URL base da API da Last.fm.
  const LAST_FM_BASE_URL = 'https://ws.audioscrobbler.com/2.0';

  // Função para buscar informações sobre o artista.
  const searchArtist = async () => {
    if (!artist) {
      setError('Digite o nome do artista antes de buscar.'); // Se o campo do artista estiver vazio, define uma mensagem de erro.
      return;
    }

    setLoading(true); // Define loading como true para exibir uma mensagem de carregamento.

    try {
      // Faz solicitações à API da Last.fm para obter informações sobre o artista, suas principais faixas e artistas similares.
      const artistResponse = await axios.get(
        `${LAST_FM_BASE_URL}/?method=artist.search&artist=${artist}&api_key=${API_KEY}&format=json`
      );

      // Extrai o nome do artista a partir da resposta da API.
      const artistName = artistResponse.data.results.artistmatches.artist[0].name;

      // Faz uma solicitação para obter as principais faixas do artista.
      const topTracksResponse = await axios.get(
        `${LAST_FM_BASE_URL}/?method=artist.gettoptracks&artist=${artistName}&api_key=${API_KEY}&format=json`
      );

      // Faz uma solicitação para obter artistas similares ao artista pesquisado.
      const similarArtistsResponse = await axios.get(
        `${LAST_FM_BASE_URL}/?method=artist.getsimilar&artist=${artist}&api_key=${API_KEY}&format=json`
      );

      // Atualiza os estados com os resultados obtidos.
      setTopTracks(topTracksResponse.data.toptracks.track);
      setSimilarArtists(similarArtistsResponse.data.similarartists.artist);
      setError(''); // Limpa mensagens de erro, se houver.
    } catch (err) {
      setError('Erro ao buscar informações. Verifique o nome do artista e a chave da API.'); // Trata erros, se ocorrerem.
    } finally {
      setLoading(false); // Define loading como false após a conclusão da solicitação.
    }
  };

  // Função para limpar os resultados e redefinir o campo do artista e mensagens de erro.
  const clearResults = () => {
    setTopTracks([]);
    setSimilarArtists([]);
    setError('');
    setArtist('');
  };

  // Função para enviar feedback do usuário.
  const submitFeedback = () => {
    // Aqui você pode enviar o feedback para um servidor ou realizar alguma ação com ele.
    // Por simplicidade, apenas exibirei uma mensagem quando o feedback for enviado.
    setFeedbackSent(true);
  };

  // Efeito useEffect que monitora a alteração do estado feedbackSent.
  useEffect(() => {
    if (feedbackSent) {
      // Você pode adicionar aqui lógica para tratar o feedback enviado.
    }
  }, [feedbackSent]);

  // Renderização do componente.
  return (
    <div>
      <h1>Consulta à API da Last.fm</h1>
      <input type="text" placeholder="Nome do Artista" value={artist} onChange={(e) => setArtist(e.target.value)} />
      <button onClick={searchArtist} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      <button onClick={clearResults}>Limpar Resultados</button>

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
      <button onClick={submitFeedback} disabled={feedbackSent}>
        {feedbackSent ? 'Feedback Enviado' : 'Enviar Feedback'}
      </button>

      {feedbackSent && <p>Obrigado pelo seu feedback!</p>}
    </div>
  );
}

export default LastFMSearch;
