import React, { lazy, Suspense, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { routes } from './routes';
import { setRoutes } from '../utils/routesHelper';
import StudantRoutes from './StudantRoutes';
import LoginRoutes from './LoginRoutes';
import TeacherRoutes from './TeacherRoutes';

export const history = createBrowserHistory();

function Routing() {
  useEffect(() => {
    setRoutes(routes);
  }, []);
  const userString = localStorage.getItem('user');
  const user = userString && JSON.parse(userString);

  return user ? (user.isTeacher && <TeacherRoutes />) || <StudantRoutes /> : <LoginRoutes />;
}

export default Routing;
