import React from 'react';
import { ThemeProvider } from '@passfort/castle';
import '@passfort/castle/lib/index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { dataLoader } from './DataLoader';
import CustomCheck from './CustomCheck';
import GeneralError from './Errors/GeneralError'; // need to edit

// leaving in reactRouter for now, can remove if too fluffy
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/:id?" // this should be the bvdid
      loader={dataLoader}
      element={<CustomCheck />}
      errorElement={<GeneralError />}
    ></Route>,
  ),
  {
    basename: process.env.REACT_APP_BASENAME,
  },
);

function App() {
  const token = sessionStorage.getItem('token'); // is this needed?

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export const cacheBust = 'foo'; // ?

export default App;
