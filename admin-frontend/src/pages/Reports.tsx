import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { api } from '../services/api';
import type { CategoryBalance } from '../types';

export function Reports() {
  const [balances, setBalances] = useState<CategoryBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBalances();
  }, []);

  async function loadBalances() {
    try {
      const data = await api.categoryBalances.getAll();
      setBalances(data);
    } catch (error) {
      console.error('Failed to load category balances:', error);
    } finally {
      setLoading(false);
    }
  }

  // Calculate summary statistics
  const totalBalance = balances.reduce((sum, b) => sum + b.category_balance, 0);
  const totalTransactions = balances.reduce((sum, b) => sum + b.transaction_count, 0);
  const avgTransactionAmount =
    totalTransactions > 0 ? totalBalance / totalTransactions : 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-gray-600 mt-1">View category balances and transaction analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Balance</h3>
          <p className="text-2xl font-bold text-gray-900">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-50">
              <Activity className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Transactions</h3>
          <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-50">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Transaction</h3>
          <p className="text-2xl font-bold text-gray-900">
            ${avgTransactionAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-50">
              <BarChart3 className="text-orange-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Categories</h3>
          <p className="text-2xl font-bold text-gray-900">{balances.length}</p>
        </div>
      </div>

      {/* Category Balances Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Category Balances</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transactions
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Min / Max
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Loading category balances...
                </td>
              </tr>
            ) : balances.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No category balances found
                </td>
              </tr>
            ) : (
              balances.map((balance, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {balance.account_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {balance.category_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(balance.balance_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                    ${balance.category_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    {balance.transaction_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    ${balance.average_transaction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    ${balance.min_transaction.toFixed(2)} / ${balance.max_transaction.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
