import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FiSearch } from 'react-icons/fi';

const Supervisors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const snapshot = await getDocs(collection(db, "faculty"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSupervisors(data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };
    fetchSupervisors();
  }, []);

  const filtered = supervisors.filter((s) =>
    s.domain?.toLowerCase().includes(search.toLowerCase()) ||
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-red-500 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Meet Our FYP Supervisors</h2>

        {/* Search Bar */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search by name or domain"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Supervisor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No supervisors match your search.</p>
          ) : (
            filtered.map((supervisor) => (
              <div key={supervisor.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <img
                    src={supervisor.imageURL || "https://randomuser.me/api/portraits/lego/2.jpg"}
                    alt={supervisor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-300"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-700">{supervisor.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">📧 {supervisor.email}</p>
                    <p className="text-sm text-gray-600">📘 Domain: <span className="text-black">{supervisor.domain}</span></p>
                    <p className="text-sm text-gray-600">🕒 Office Hours: <span className="text-black">{supervisor.officeHours}</span></p>
                    <p className="text-sm text-gray-600">📌 Slots: <span className="font-medium">{supervisor.slots}</span></p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Supervisors;
