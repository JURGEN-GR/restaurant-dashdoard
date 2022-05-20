import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import 'sweetalert2/src/sweetalert2.scss';
import './styles/styles.scss';

// Configuracion de mapbox
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
