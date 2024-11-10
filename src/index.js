import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import './index.css';
import App from './App';
import MediaList from './MediaList';
import MyStuffList from './MyStuffList';
import Popular from './Popular';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'popular',
        element: <Popular />,
        children:
          [
            {
              path: 'movies',
              element: <MediaList />,
            },
            {
              path: 'tv-shows',
              element: <MediaList />,
            },
          ]
      },
      {
        path: 'my-stuff-list',
        element: <MyStuffList />,
        children:
          [
            {
              path: 'list-contents',
              element: <MediaList />,
            },
          ]
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
