import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { api } from '../services/api';
import type { TransactionCategory } from '../types';

export function TransactionCategories() {
  const [categories, setCategories] = useState<TransactionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await api.transactionCategories.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load transaction categories:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.category_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.category_group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group categories by category_group
  const groupedCategories = filteredCategories.reduce((acc, category) => {
    const group = category.category_group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(category);
    return acc;
  }, {} as Record<string, TransactionCategory[]>);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transaction Categories</h2>
          <p className="text-gray-600 mt-1">Manage transaction category reference data</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transaction categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grouped Cards */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading transaction categories...</div>
        ) : Object.keys(groupedCategories).length === 0 ? (
          <div className="py-8 text-center text-gray-500">No transaction categories found</div>
        ) : (
          Object.entries(groupedCategories).map(([group, categoryList]) => (
            <div key={group}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{group}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryList.map((category) => (
                  <div
                    key={category.category_code}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{category.category_name}</h4>
                        <p className="text-xs text-gray-500">Code: {category.category_code}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{category.category_description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
