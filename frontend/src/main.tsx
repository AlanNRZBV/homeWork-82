import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { PersistGate } from 'redux-persist/integration/react';
// import { addInterceptors } from './axiosApi.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </PersistGate>
    </LocalizationProvider>
  </React.StrictMode>,
);
