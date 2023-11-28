import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UsersList from './Components/UsersList/UsersList.jsx';
import base_url from '../public/config.js';
// import base_url from '/config.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/users",
        element: <UsersList></UsersList>,

      },
      {
        path: "/users/:user_id/:month/:year",
        loader: ({ params }) => fetch(`${base_url}/api/hostel/monthly-user-details/?user_id=${parseInt(params.user_id)}&year=${parseInt(params.year)}&month=${parseInt(params.month)}`),
        element: <UsersList></UsersList>,

      },
      {
        path: "/users/deactivate/:user_id/",
        // console.log({params}),
        loader: ({ params }) => fetch(`${base_url}/api/user/deactivate/${parseInt(params.user_id)}`),
        element: <UsersList></UsersList>,

      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
