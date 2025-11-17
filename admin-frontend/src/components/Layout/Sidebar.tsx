import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Wallet,
  CreditCard,
  Receipt,
  FileText,
  Tags,
  FolderTree,
  BarChart3,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  section?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Users', path: '/users', icon: <Users size={20} />, section: 'Core Management' },
  { name: 'Customers', path: '/customers', icon: <UserCircle size={20} /> },
  { name: 'Accounts', path: '/accounts', icon: <Wallet size={20} /> },
  { name: 'Cards', path: '/cards', icon: <CreditCard size={20} /> },
  { name: 'Transactions', path: '/transactions', icon: <Receipt size={20} />, section: 'Operations' },
  { name: 'Disclosure Groups', path: '/disclosure-groups', icon: <FileText size={20} />, section: 'Reference Data' },
  { name: 'Transaction Types', path: '/transaction-types', icon: <Tags size={20} /> },
  { name: 'Transaction Categories', path: '/transaction-categories', icon: <FolderTree size={20} /> },
  { name: 'Reports & Analytics', path: '/reports', icon: <BarChart3 size={20} />, section: 'Analytics' },
];

export function Sidebar() {
  let currentSection = '';

  return (
    <aside className="w-64 bg-gray-900 text-white h-[calc(100vh-73px)] overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const showSection = item.section && item.section !== currentSection;
          if (item.section) {
            currentSection = item.section;
          }

          return (
            <div key={item.path}>
              {showSection && (
                <div className="px-3 py-2 mt-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.section}
                </div>
              )}
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
