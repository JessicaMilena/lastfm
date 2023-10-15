import React from 'react';

interface PropsDoComponenteDeErro {
  erro: string;
}

function ComponenteDeErro({ erro }: PropsDoComponenteDeErro) {
  return erro && <p>{erro}</p>; //expressão condicional
}

export default ComponenteDeErro;
