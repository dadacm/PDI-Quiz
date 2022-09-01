import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { routes } from './routes';
import { setRoutes } from '../utils/routesHelper';

export const history = createBrowserHistory();

const Login = lazy(() => import('../Pages/login/Login'));

function LoginRoutes() {
  useEffect(() => {
    setRoutes(routes);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default LoginRoutes;
