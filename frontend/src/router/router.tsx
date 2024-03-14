import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import Artists from '../features/Artists/Artists.tsx';
import Albums from '../features/Albums/Albums.tsx';
import Login from '../features/Users/Login.tsx';
import TracksHistory from '../features/TracksHistory/TracksHistory.tsx';
import AlbumExtended from '../features/Albums/AlbumExtended.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';
import AlbumsForm from '../features/Albums/components/AlbumsForm.tsx';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.tsx';
import ArtistsForm from '../features/Artists/components/ArtistsForm.tsx';
import TracksForm from '../features/Tracks/components/TracksForm.tsx';
import Register from '../features/Users/Register.tsx';

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
        path: '/artists/new',
        element: (
          <ProtectedRoute>
            <ArtistsForm />
          </ProtectedRoute>
        ),
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
        path: '/albums/new',
        element: (
          <ProtectedRoute>
            <AlbumsForm />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tracks/new',
        element: (
          <ProtectedRoute>
            <TracksForm />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/track-history',
        element: <TracksHistory />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
