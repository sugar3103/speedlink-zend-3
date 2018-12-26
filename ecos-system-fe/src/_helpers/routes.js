import React from 'react';

const Country   = React.lazy(() => import('../views/Address/Country'));
const Code      = React.lazy(() => import('../views/Address/Code'));

const routes = [
    { path: '/address/country', name: "Countries", component: Country },
    { path: '/address/code', name: "Address Code", component: Code},
]

export default routes;
