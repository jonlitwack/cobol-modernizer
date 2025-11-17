import { User, LogOut, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">CardDemo Admin</h1>
          <span className="text-sm text-gray-500 bg-blue-100 px-3 py-1 rounded-full">
            Mainframe Credit Card System
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>

          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
