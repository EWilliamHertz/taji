"use client";

import { useState, useEffect } from "react";
import { loginAdmin, logoutAdmin, getAdminBookings, updateBookingStatus, getSchedule, updateSchedule, getMenuItems, toggleMenuItemSoldOut, saveMenuItem, deleteMenuItem, uploadImage } from "@/app/actions";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AdminClient({ initialIsAdmin }: { initialIsAdmin: boolean }) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<any>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    const b = await getAdminBookings();
    setBookings(b);
    const s = await getSchedule();
    if (s.length === 0) {
      setSchedule(DAYS.map(d => ({ day_of_week: d, location_name: "", time_range: "", is_active: false })));
    } else {
      setSchedule(s);
    }
    const m = await getMenuItems();
    setMenuItems(m);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginAdmin(password);
    if (res.success) {
      setIsAdmin(true);
    } else {
      alert("Invalid password");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAdmin(false);
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    await updateBookingStatus(id, status);
    fetchData();
  };

  const handleSaveSchedule = async () => {
    setLoading(true);
    await updateSchedule(schedule);
    alert("Schedule saved!");
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isAdditional: boolean) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    
    try {
      const urls = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const formData = new FormData();
        formData.append("file", e.target.files[i]);
        const url = await uploadImage(formData);
        urls.push(url);
      }
      
      if (isAdditional) {
        const current = editingMenuItem.additional_images ? editingMenuItem.additional_images + ", " : "";
        setEditingMenuItem({ ...editingMenuItem, additional_images: current + urls.join(", ") });
      } else {
        setEditingMenuItem({ ...editingMenuItem, image: urls[0] });
      }
    } catch (err) {
      alert("Upload failed. Make sure BLOB_READ_WRITE_TOKEN is set.");
    }
    
    setLoading(false);
  };

  if (!isAdmin) {
    return (
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-[#111] p-8 rounded-xl border border-white/10 mt-20">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white mb-4"
        />
        <button disabled={loading} className="w-full bg-yellow-400 text-black font-bold p-3 rounded-lg">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      <div className="flex justify-between items-center bg-[#111] p-4 rounded-xl border border-white/10">
        <h2 className="text-xl font-bold">Welcome, Admin</h2>
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-bold">Logout</button>
      </div>

      <section className="bg-[#111] p-6 rounded-xl border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-yellow-400">Weekly Schedule</h2>
          <button onClick={handleSaveSchedule} disabled={loading} className="bg-yellow-400 text-black px-4 py-2 font-bold rounded">
            Save Schedule
          </button>
        </div>
        <div className="grid gap-4">
          {schedule.map((day, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row gap-4 lg:items-center bg-white/5 p-4 rounded-lg">
              <div className="w-32 font-bold">{day.day_of_week}</div>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={day.is_active} 
                  onChange={(e) => {
                    const newS = [...schedule];
                    newS[idx].is_active = e.target.checked;
                    setSchedule(newS);
                  }}
                  className="w-5 h-5 accent-yellow-400"
                />
                Active
              </label>
              <input 
                type="text" 
                placeholder="Location Name" 
                value={day.location_name}
                onChange={(e) => {
                  const newS = [...schedule];
                  newS[idx].location_name = e.target.value;
                  setSchedule(newS);
                }}
                className="flex-1 bg-black/50 border border-white/10 rounded p-2 text-white disabled:opacity-50"
                disabled={!day.is_active}
              />
              <input 
                type="text" 
                placeholder="Time (e.g. 11:00 - 14:00)" 
                value={day.time_range}
                onChange={(e) => {
                  const newS = [...schedule];
                  newS[idx].time_range = e.target.value;
                  setSchedule(newS);
                }}
                className="flex-1 bg-black/50 border border-white/10 rounded p-2 text-white disabled:opacity-50"
                disabled={!day.is_active}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111] p-6 rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Booking Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="p-3">Date & Time</th>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Details</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 whitespace-nowrap">{b.date} <br/><span className="text-yellow-400">{b.time}</span></td>
                  <td className="p-3">
                    <div className="font-bold">{b.name}</div>
                    <div className="text-sm text-white/50">{b.email}</div>
                  </td>
                  <td className="p-3 uppercase text-xs font-bold tracking-wider">
                    {b.type === 'catering' ? <span className="text-blue-400">Catering ({b.guests}p)</span> : <span className="text-green-400">Pre-order</span>}
                  </td>
                  <td className="p-3 text-sm max-w-xs truncate" title={b.details}>{b.details || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      b.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                      b.status === 'approved' ? 'bg-green-400/20 text-green-400' :
                      'bg-red-400/20 text-red-400'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {b.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateStatus(b.id, 'approved')} className="bg-green-500/20 text-green-400 px-3 py-1 rounded hover:bg-green-500/40 font-bold text-sm">Approve</button>
                        <button onClick={() => handleUpdateStatus(b.id, 'rejected')} className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/40 font-bold text-sm">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-white/50">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-[#111] p-6 rounded-xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">Menu Management</h2>
          <button 
            onClick={() => setEditingMenuItem({ title_en: "", title_sv: "", desc_en: "", desc_sv: "", price: "", image: "", additional_images: "", tags: "", is_sold_out: false })}
            className="bg-yellow-400 text-black px-4 py-2 font-bold rounded"
          >
            + Add New Item
          </button>
        </div>
        <div className="grid gap-4">
          {menuItems.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-white/5 p-4 rounded-lg gap-4">
              <div>
                <div className="font-bold text-lg">{item.title_en || 'Untitled'}</div>
                <div className="text-sm text-white/50">{item.price} {item.tags ? `• ${item.tags}` : ''}</div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer mr-4">
                  <span className="text-sm font-bold">Sold Out?</span>
                  <input 
                    type="checkbox" 
                    checked={item.is_sold_out} 
                    onChange={async (e) => {
                      await toggleMenuItemSoldOut(item.id, e.target.checked);
                      fetchData();
                    }}
                    className="w-5 h-5 accent-red-500"
                  />
                </label>
                <button onClick={() => setEditingMenuItem(item)} className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 text-sm font-bold">Edit</button>
                <button onClick={async () => {
                  if (confirm("Are you sure you want to delete this?")) {
                    await deleteMenuItem(item.id);
                    fetchData();
                  }
                }} className="bg-red-500/20 text-red-400 px-4 py-2 rounded hover:bg-red-500/40 text-sm font-bold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editingMenuItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#111] border border-white/10 p-6 rounded-xl w-full max-w-2xl my-8">
            <h2 className="text-2xl font-bold mb-4">{editingMenuItem.id ? "Edit Menu Item" : "Add Menu Item"}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await saveMenuItem(editingMenuItem.id || null, editingMenuItem);
              setEditingMenuItem(null);
              fetchData();
              setLoading(false);
            }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-sm text-white/50 block">Title (EN) - Optional</label><input className="w-full bg-white/5 border border-white/10 p-2 rounded" value={editingMenuItem.title_en || ""} onChange={e => setEditingMenuItem({...editingMenuItem, title_en: e.target.value})} /></div>
                <div><label className="text-sm text-white/50 block">Title (SV) - Optional</label><input className="w-full bg-white/5 border border-white/10 p-2 rounded" value={editingMenuItem.title_sv || ""} onChange={e => setEditingMenuItem({...editingMenuItem, title_sv: e.target.value})} /></div>
                <div><label className="text-sm text-white/50 block">Desc (EN) - Optional</label><textarea rows={3} className="w-full bg-white/5 border border-white/10 p-2 rounded" value={editingMenuItem.desc_en || ""} onChange={e => setEditingMenuItem({...editingMenuItem, desc_en: e.target.value})} /></div>
                <div><label className="text-sm text-white/50 block">Desc (SV) - Optional</label><textarea rows={3} className="w-full bg-white/5 border border-white/10 p-2 rounded" value={editingMenuItem.desc_sv || ""} onChange={e => setEditingMenuItem({...editingMenuItem, desc_sv: e.target.value})} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-sm text-white/50 block">Price - Optional</label><input className="w-full bg-white/5 border border-white/10 p-2 rounded" value={editingMenuItem.price || ""} onChange={e => setEditingMenuItem({...editingMenuItem, price: e.target.value})} /></div>
                <div><label className="text-sm text-white/50 block">Tags (comma separated) - Optional</label><input className="w-full bg-white/5 border border-white/10 p-2 rounded" value={editingMenuItem.tags || ""} onChange={e => setEditingMenuItem({...editingMenuItem, tags: e.target.value})} /></div>
              </div>
              <div>
                <label className="text-sm text-white/50 block">Primary Image URL - Optional</label>
                <div className="flex gap-2">
                  <input className="w-full bg-white/5 border border-white/10 p-2 rounded flex-1" value={editingMenuItem.image || ""} onChange={e => setEditingMenuItem({...editingMenuItem, image: e.target.value})} placeholder="URL will appear here after upload" />
                  <label className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded cursor-pointer font-bold whitespace-nowrap">
                    Upload
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, false)} />
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm text-white/50 block">Additional Images (comma separated URLs) - Optional</label>
                <div className="flex gap-2">
                  <input className="w-full bg-white/5 border border-white/10 p-2 rounded flex-1" value={editingMenuItem.additional_images || ""} onChange={e => setEditingMenuItem({...editingMenuItem, additional_images: e.target.value})} placeholder="URLs will appear here after upload" />
                  <label className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded cursor-pointer font-bold whitespace-nowrap">
                    Upload More
                    <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, true)} />
                  </label>
                </div>
              </div>
              
              <div className="flex gap-4 justify-end mt-6">
                <button type="button" onClick={() => setEditingMenuItem(null)} className="px-4 py-2 hover:bg-white/10 rounded">Cancel</button>
                <button type="submit" disabled={loading} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">{loading ? "Saving/Uploading..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
