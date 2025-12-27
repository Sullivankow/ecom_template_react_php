

import AdminSidebar from './components/adminSidebar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 md:ml-64">
        <div id="admin" className="text-black">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminPage;