import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </PersistGate>
      </LocalizationProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
