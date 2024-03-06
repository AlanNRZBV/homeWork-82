import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import Artists from '../features/Artists/Artists.tsx';
import Artist from '../features/Artist/Artist.tsx';
import Albums from '../features/Albums/Albums.tsx';
import Login from '../features/Users/Login.tsx';
import Register from '../features/Users/Register.tsx';
import TracksHistory from '../features/Tracks/TracksHistory.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Artists />,
      },
      {
        path: '/artist',
        element: <Artist />,
      },
      {
        path: '/artist/:id',
        element: <Artist />,
      },
      {
        path: '/albums/:id',
        element: <Albums />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/track-history',
        element: <TracksHistory />,
      },
    ],
  },
]);
