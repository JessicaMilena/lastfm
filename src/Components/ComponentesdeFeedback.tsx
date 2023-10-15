import React, { useState } from 'react';

interface PropsDoComponenteDeFeedback {
  onSubmit: (feedback: string) => void; //indica que a função não retorna nenhum valor
}

function ComponenteDeFeedback({ onSubmit }: PropsDoComponenteDeFeedback) {
  const [feedback, setFeedback] = useState('');

  const lidarComEnvio = () => { //é chamada quando o botão para enviar feedback é clicada
    onSubmit(feedback); //chama a função onsubmit passando o valor atual de feedback como argumento
  };

  return (
    <div>
      <h2>Feedback do Usuário:</h2>
      <textarea //multiplas linhas
        rows={4}
        cols={50}
        placeholder="Deixe seu feedback aqui"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={lidarComEnvio}>Enviar Feedback</button>
    </div>
  );
}

export default ComponenteDeFeedback;
