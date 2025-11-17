import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { api } from '../services/api';
import type { TransactionType } from '../types';

export function TransactionTypes() {
  const [types, setTypes] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTypes();
  }, []);

  async function loadTypes() {
    try {
      const data = await api.transactionTypes.getAll();
      setTypes(data);
    } catch (error) {
      console.error('Failed to load transaction types:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTypes = types.filter(
    (type) =>
      type.type_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.type_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transaction Types</h2>
          <p className="text-gray-600 mt-1">Manage transaction type reference data</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          <span>Add Type</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transaction types..."
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
                Type Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Debit/Credit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Default Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Loading transaction types...
                </td>
              </tr>
            ) : filteredTypes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No transaction types found
                </td>
              </tr>
            ) : (
              filteredTypes.map((type) => (
                <tr key={type.type_code} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {type.type_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {type.type_description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        type.debit_credit_indicator === 'Debit'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {type.debit_credit_indicator}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {type.category_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
