import React from 'react';
import { Dashboard } from './pages/Dashboard';
import { StatusList } from './pages/MasterData';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Dashboard />
  },
  {
    path: '/status',
    exact: false,
    main: () => <StatusList />
  }
];

export default routes;