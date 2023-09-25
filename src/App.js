// Importa a biblioteca React para criar componentes React.
import React from 'react';

// Importa o componente personalizado LastFMSearch.
import LastFMSearch from './Components/LastFMSearch';

// Define o componente funcional "App".
function App() {
  return (
    <div className="App">
      {/* Renderiza o componente "LastFMSearch". */}
      <LastFMSearch />
    </div>
  );
}

// Exporta o componente "App" como o componente principal da aplicação.
export default App;
