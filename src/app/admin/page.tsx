import { checkAdmin } from "@/app/actions";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const isAdmin = await checkAdmin();
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-yellow-400">Admin Dashboard</h1>
        <AdminClient initialIsAdmin={isAdmin} />
      </div>
    </div>
  );
}
