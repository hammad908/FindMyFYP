import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [faculty, setFaculty] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [assignedCount, setAssignedCount] = useState(0);
  const [availableSlots, setAvailableSlots] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const facultySnap = await getDocs(collection(db, "faculty"));
      const ideasSnap = await getDocs(collection(db, "ideas"));

      const facultyData = facultySnap.docs.map(doc => doc.data());
      const ideasData = ideasSnap.docs.map(doc => doc.data());

      setFaculty(facultyData);
      setIdeas(ideasData);

      const assigned = ideasData.filter(i => i.status === "accepted").length;
      const totalAvailableSlots = facultyData.reduce((sum, f) => sum + (f.slots || 0), 0);

      setAssignedCount(assigned);
      setAvailableSlots(totalAvailableSlots);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-red-600 p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">👑 Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white text-purple-800 p-6 rounded-xl shadow">
            <p className="text-lg font-semibold">Total Faculty</p>
            <p className="text-2xl font-bold">{faculty.length}</p>
          </div>
          <div className="bg-white text-purple-800 p-6 rounded-xl shadow">
            <p className="text-lg font-semibold">Ideas Submitted</p>
            <p className="text-2xl font-bold">{ideas.length}</p>
          </div>
          <div className="bg-white text-purple-800 p-6 rounded-xl shadow">
            <p className="text-lg font-semibold">Assigned Students</p>
            <p className="text-2xl font-bold">{assignedCount}</p>
          </div>
          <div className="bg-white text-purple-800 p-6 rounded-xl shadow">
            <p className="text-lg font-semibold">Available Slots</p>
            <p className="text-2xl font-bold">{availableSlots}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/admin/faculty-form" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
            ➕ Add Faculty
          </Link>
          <Link to="/admin/review-ideas" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow">
            📋 Review Ideas
          </Link>
          <Link to="/admin/faculty-list" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">
            👥 Faculty List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
