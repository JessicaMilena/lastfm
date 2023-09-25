// Importa a biblioteca React, que é necessária para criar componentes React.
import React from 'react';

// Importa a biblioteca ReactDOM, que é responsável por renderizar componentes React no DOM (Document Object Model).
import ReactDOM from 'react-dom';

// Importa o componente principal da aplicação, que provavelmente é o componente "App" que foi criado em algum lugar do projeto.
import App from './App';

// Usa o ReactDOM para renderizar o componente "App" no elemento com o ID "root" no HTML.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
