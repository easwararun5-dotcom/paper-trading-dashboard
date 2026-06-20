import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - trading pages
const OptionsChain = Loadable(lazy(() => import('pages/options-chain')));
const Portfolio = Loadable(lazy(() => import('pages/portfolio')));
const Trades = Loadable(lazy(() => import('pages/trades')));
const Strategies = Loadable(lazy(() => import('pages/strategies')));
const Settings = Loadable(lazy(() => import('pages/settings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'options-chain',
      element: <OptionsChain />
    },
    {
      path: 'portfolio',
      element: <Portfolio />
    },
    {
      path: 'trades',
      element: <Trades />
    },
    {
      path: 'strategies',
      element: <Strategies />
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
};

export default MainRoutes;
