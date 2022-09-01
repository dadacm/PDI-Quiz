import React, { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routes } from './routes';
import { setRoutes } from '../utils/routesHelper';

export const history = createBrowserHistory();

const Home = lazy(() => import('../Pages/studantPages/home/Home'));

function StudantRoutes() {
  useEffect(() => {
    setRoutes(routes);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default StudantRoutes;
