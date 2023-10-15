import axios from 'axios';
const AlbumAPI = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0',
});

export default AlbumAPI;
