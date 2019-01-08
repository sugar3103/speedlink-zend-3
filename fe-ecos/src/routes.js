import React from 'react';
import { Dashboard } from './pages/Dashboard';
import { StatusPage } from './pages/MasterData';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: '/status',
    exact: false,
    main: () => <StatusPage />
  }
];

export default routes;