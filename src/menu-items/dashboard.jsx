// assets
import { DashboardOutlined, ExperimentOutlined, SettingOutlined, StockOutlined, SwapOutlined, WalletOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ExperimentOutlined,
  SettingOutlined,
  StockOutlined,
  SwapOutlined,
  WalletOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'paper-trading',
  title: 'Paper Trading Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      type: 'item',
      url: '/portfolio',
      icon: icons.WalletOutlined,
      breadcrumbs: false
    },
    {
      id: 'trades',
      title: 'Trades',
      type: 'item',
      url: '/trades',
      icon: icons.SwapOutlined,
      breadcrumbs: false
    },
    {
      id: 'strategies',
      title: 'Strategies',
      type: 'item',
      url: '/strategies',
      icon: icons.ExperimentOutlined,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.SettingOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
