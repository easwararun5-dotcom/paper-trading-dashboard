// assets
import { DashboardOutlined, ExperimentOutlined, SettingOutlined, SwapOutlined, TableOutlined, WalletOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ExperimentOutlined,
  SettingOutlined,
  SwapOutlined,
  TableOutlined,
  WalletOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'paper-trading',
  title: 'AI Index Options Platform',
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
      id: 'options-chain',
      title: 'Options Chain',
      type: 'item',
      url: '/options-chain',
      icon: icons.TableOutlined,
      breadcrumbs: false
    },
    {
      id: 'portfolio',
      title: 'Positions',
      type: 'item',
      url: '/portfolio',
      icon: icons.WalletOutlined,
      breadcrumbs: false
    },
    {
      id: 'trades',
      title: 'Signals',
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
