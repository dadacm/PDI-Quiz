import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routes } from './routes';
import { setRoutes } from '../utils/routesHelper';

export const history = createBrowserHistory();

const Home = lazy(() => import('../Pages/teacherPages/Home/Home'));

function TeacherRoutes() {
  useEffect(() => {
    setRoutes(routes);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default TeacherRoutes;
