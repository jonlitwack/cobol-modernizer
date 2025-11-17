import { useEffect, useState } from 'react';
import { Users, UserCircle, Wallet, CreditCard, Receipt, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

interface DashboardStats {
  totalUsers: number;
  totalCustomers: number;
  totalAccounts: number;
  totalCards: number;
  totalTransactions: number;
  activeAccounts: number;
  pendingTransactions: number;
  totalBalance: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [users, customers, accounts, cards, transactions] = await Promise.all([
          api.users.getAll(),
          api.customers.getAll(),
          api.accounts.getAll(),
          api.cards.getAll(),
          api.transactions.getAll(),
        ]);

        const activeAccounts = accounts.filter(a => a.account_status === 'Active').length;
        const pendingTransactions = transactions.filter(t => t.post_status === 'Pending').length;
        const totalBalance = accounts.reduce((sum, acc) => sum + acc.current_balance, 0);

        setStats({
          totalUsers: users.length,
          totalCustomers: customers.length,
          totalAccounts: accounts.length,
          totalCards: cards.length,
          totalTransactions: transactions.length,
          activeAccounts,
          pendingTransactions,
          totalBalance,
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Failed to load dashboard data</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <Users className="text-blue-600" size={24} />,
      bgColor: 'bg-blue-50',
      change: '+2 this week',
      changePositive: true,
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <UserCircle className="text-green-600" size={24} />,
      bgColor: 'bg-green-50',
      change: '+15 this month',
      changePositive: true,
    },
    {
      title: 'Active Accounts',
      value: `${stats.activeAccounts}/${stats.totalAccounts}`,
      icon: <Wallet className="text-purple-600" size={24} />,
      bgColor: 'bg-purple-50',
      change: '100% active',
      changePositive: true,
    },
    {
      title: 'Total Cards',
      value: stats.totalCards,
      icon: <CreditCard className="text-orange-600" size={24} />,
      bgColor: 'bg-orange-50',
      change: 'All active',
      changePositive: true,
    },
    {
      title: 'Total Transactions',
      value: stats.totalTransactions,
      icon: <Receipt className="text-indigo-600" size={24} />,
      bgColor: 'bg-indigo-50',
      change: `${stats.pendingTransactions} pending`,
      changePositive: stats.pendingTransactions === 0,
    },
    {
      title: 'Total Balance',
      value: `$${stats.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: <TrendingUp className="text-emerald-600" size={24} />,
      bgColor: 'bg-emerald-50',
      change: '+5.2% this month',
      changePositive: true,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome to CardDemo Admin - Mainframe Credit Card Processing System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                {stat.icon}
              </div>
              {stat.changePositive ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <AlertCircle className="text-yellow-500" size={20} />
              )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className={`text-sm ${stat.changePositive ? 'text-green-600' : 'text-yellow-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-gray-600">Platform:</dt>
              <dd className="text-gray-900 font-medium">IBM Mainframe (z/OS)</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Database:</dt>
              <dd className="text-gray-900 font-medium">VSAM (KSDS)</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Transaction Manager:</dt>
              <dd className="text-gray-900 font-medium">CICS</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Programming Language:</dt>
              <dd className="text-gray-900 font-medium">COBOL</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Batch Processing:</dt>
              <dd className="text-gray-900 font-medium">JCL Jobs</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="font-medium text-blue-900">View Pending Transactions</div>
              <div className="text-sm text-blue-700">{stats.pendingTransactions} transactions awaiting review</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="font-medium text-green-900">Add New Customer</div>
              <div className="text-sm text-green-700">Create a new customer account</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="font-medium text-purple-900">Generate Reports</div>
              <div className="text-sm text-purple-700">View analytics and category balances</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
