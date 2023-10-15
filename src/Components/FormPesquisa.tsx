import React, { useState } from 'react';

interface PropsPesquisa {
aoPesquisar: (artista: string) => void;
aoLimpar: () => void;
}

function FormularioPesquisa({ aoPesquisar, aoLimpar }: PropsPesquisa) {
const [artista, setArtista] = useState('');
//estado local

const lidarComPesquisa = () => { //chama a função ao pesquisar
aoPesquisar(artista); //passando o valor atual para o artista
};

return (
<div>
<input type="text" placeholder="Nome do Artista" onChange={(e) => setArtista(e.target.value)} />
<button onClick={lidarComPesquisa}>Buscar</button>
<button onClick={aoLimpar}>Limpar Resultados</button>
</div>
);
}

export default FormularioPesquisa;