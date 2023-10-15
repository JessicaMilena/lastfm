import React, { useState } from 'react';
import axios from 'axios';
import FormPesquisa from './FormPesquisa';
import Erro from './Erro';
import ListaFaixa from './ListaFaixa';
import ComponentesdeFeedback from './ComponentesdeFeedback';


//São definidas interfaces para representar a estrutura das respostas da API.
// Cada interface corresponde a um tipo específico de resposta.

interface Faixa {
  nome: string;
}

interface RespostaBuscaArtista {
  resultados: {
    artistmatches: {
      artista: Faixa[];
    };
  };
}

interface RespostaTopFaixas {
  topfaixas: {
    faixa: Faixa[];
  };
}

interface RespostaArtistasSimilares {
  artistassimilares: {
    artista: Faixa[];
  };
}

// estado local do componente.
function BuscaLastFM() {
  const [artista, setArtista] = useState<string>('');
  const [topFaixas, setTopFaixas] = useState<Faixa[]>([]);
  const [artistasSimilares, setArtistasSimilares] = useState<Faixa[]>([]);
  const [erro, setErro] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackEnviado, setFeedbackEnviado] = useState<boolean>(false);

  const CHAVE_API = '12af3de3988cc64768f49b66de9d5718';
  const LAST_FM_URL_BASE = 'https://ws.audioscrobbler.com/2.0';

  const buscarArtista = async () => {
    try {
      const respostaArtista = await axios.get<RespostaBuscaArtista>(
        `${LAST_FM_URL_BASE}/?method=artist.search&artist=${artista}&api_key=${CHAVE_API}&format=json`
      );
  
      console.log('Resposta Artista:', respostaArtista.data);
  
      const artistMatches = respostaArtista.data?.resultados?.artistmatches;
      
      if (artistMatches && artistMatches.artista) {
        const nomeArtista = (artistMatches.artista[0]?.nome as string) || '';
  
        const respostaTopFaixas = await axios.get<RespostaTopFaixas>(
          `${LAST_FM_URL_BASE}/?method=artist.gettopfaixas&artist=${nomeArtista}&api_key=${CHAVE_API}&format=json`
        );
  
        const respostaArtistasSimilares = await axios.get<RespostaArtistasSimilares>(
          `${LAST_FM_URL_BASE}/?method=artist.getsimilares&artist=${artista}&api_key=${CHAVE_API}&format=json`
        );
  
        setTopFaixas(respostaTopFaixas.data?.topfaixas?.faixa || []);
        setArtistasSimilares(respostaArtistasSimilares.data?.artistassimilares?.artista || []);
        setErro('');
      } else {
        setErro('Artista não encontrado. Verifique se o nome está correto e tente novamente.');
      }
    } catch (err) {
      console.error('Erro:', err);
      setErro('Ocorreu um erro ao buscar o artista. Tente novamente mais tarde.');
    }
  };
  

  const limparResultados = () => {
    setTopFaixas([]);
    setArtistasSimilares([]);
    setErro('');
  };

  const enviarFeedback = () => {
    setFeedbackEnviado(true);
  };

  return (
    <div>
      <h1>Consulta à API da Last.fm</h1>
      <input type="text" placeholder="Nome do Artista" onChange={(e) => setArtista(e.target.value)} />
      <button onClick={buscarArtista}>Buscar</button>
      <button onClick={limparResultados}>Limpar Resultados</button>

      {erro && <p>{erro}</p>}

      <h2>Principais Faixas do Artista:</h2>
      <ul>
        {topFaixas.map((faixa, index) => (
          <li key={index}>{faixa.nome}</li>
        ))}
      </ul>

      <h2>Artistas Similares:</h2>
      <ul>
        {artistasSimilares.map((artista, index) => (
          <li key={index}>{artista.nome}</li>
        ))}
      </ul>

      <h2>Feedback do Usuário:</h2>
      <textarea
        rows={4}
        cols={50}
        placeholder="Deixe seu feedback aqui"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={enviarFeedback}>Enviar Feedback</button>

      {feedbackEnviado && <p>Obrigado pelo seu feedback!</p>}
    </div>
  );
}

export default BuscaLastFM;
