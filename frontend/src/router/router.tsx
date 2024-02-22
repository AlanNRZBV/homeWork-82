import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/layout.tsx";
import Artists from '../features/Artists/Artists.tsx';

export const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Artists/>
      },
    ]
  },
]);