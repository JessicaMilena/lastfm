// Importa a biblioteca Axios para fazer requisições HTTP.
import axios from "axios";

// Cria uma instância do cliente Axios com configurações personalizadas.
const AlbumAPI = axios.create({
  baseURL: "https://ws.audioscrobbler.com/2.0",
});

// Exporta a instância do cliente como um módulo, permitindo que outros arquivos o utilizem.
export default AlbumAPI;
