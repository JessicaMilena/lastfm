
import React from 'react';

interface ListaFaixaProps {
faixas: { nome: string }[];
titulo: string;
}

function ListaFaixa({ faixas, titulo }: ListaFaixaProps) {
return (
<div>
<h2>{titulo}</h2>
<ul>
{faixas.map((faixa, index) => ( //usando metodo map para iterar sobre o array de faixar
<li key={index}>{faixa.nome}</li> //key ajuda o react a otimizar a renderização
))}
</ul> 
</div>
);
}

export default ListaFaixa;