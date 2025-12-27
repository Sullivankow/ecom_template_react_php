
import AdminSidebar from './components/adminSidebar';

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 md:ml-64">
        <div id="admin" className="text-black">
          adminPage
        </div>
      </main>
    </div>
  );
}

export default AdminPage;