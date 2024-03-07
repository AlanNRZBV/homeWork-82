import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import Artists from '../features/Artists/Artists.tsx';
import Albums from '../features/Albums/Albums.tsx';
import Login from '../features/Users/Login.tsx';
import Register from '../features/Users/Register.tsx';
import TracksHistory from '../features/TracksHistory/TracksHistory.tsx';
import AlbumExtended from '../features/Albums/AlbumExtended.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';

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
        path: '/albums/:id',
        element: <Albums />,
      },
      {
        path: '/album-extended/:id',
        element: <AlbumExtended />,
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
      },{
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
