import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { api } from '../services/api';
import type { Account } from '../types';

export function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    try {
      const data = await api.accounts.getAll();
      setAccounts(data);
    } catch (error) {
      console.error('Failed to load accounts:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredAccounts = accounts.filter(
    (account) =>
      account.account_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.account_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.customer_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Account Management</h2>
          <p className="text-gray-600 mt-1">Manage customer accounts and credit limits</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          <span>Add Account</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Limit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  Loading accounts...
                </td>
              </tr>
            ) : filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No accounts found
                </td>
              </tr>
            ) : (
              filteredAccounts.map((account) => (
                <tr key={account.account_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {account.account_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.account_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {account.customer_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {account.account_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                    ${account.current_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                    ${account.credit_limit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        account.account_status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : account.account_status === 'Suspended'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {account.account_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-600 hover:text-gray-900 mr-3">
                      <Eye size={18} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
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
