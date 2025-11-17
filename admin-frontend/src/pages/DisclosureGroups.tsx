import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { api } from '../services/api';
import type { DisclosureGroup } from '../types';

export function DisclosureGroups() {
  const [groups, setGroups] = useState<DisclosureGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadGroups();
  }, []);

  async function loadGroups() {
    try {
      const data = await api.disclosureGroups.getAll();
      setGroups(data);
    } catch (error) {
      console.error('Failed to load disclosure groups:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredGroups = groups.filter(
    (group) =>
      group.disclosure_group.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Disclosure Groups</h2>
          <p className="text-gray-600 mt-1">Manage terms and conditions groups</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          <span>Add Group</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search disclosure groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-8 text-center text-gray-500">
            Loading disclosure groups...
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="col-span-full py-8 text-center text-gray-500">
            No disclosure groups found
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.disclosure_group} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{group.group_name}</h3>
                  <p className="text-sm text-gray-500">Code: {group.disclosure_group}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{group.description}</p>
              <div className="border-t pt-3">
                <p className="text-xs text-gray-600 font-medium mb-1">Terms & Conditions:</p>
                <p className="text-xs text-gray-500 line-clamp-2">{group.terms_conditions}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
