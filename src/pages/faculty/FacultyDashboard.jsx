import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const FacultyDashboard = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    domain: "",
    officeHours: "",
    slots: 0,
    imageURL: "https://randomuser.me/api/portraits/lego/5.jpg",
  });

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const load = async () => {
      if (!uid) return;
      const ref = doc(db, "faculty", uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setData(snap.data());
      } else {
        const user = auth.currentUser;
        setData(prev => ({
          ...prev,
          name: user?.displayName || "",
          email: user?.email || "",
        }));
      }
    };
    load();
  }, [uid]);

  const handleUpdate = async () => {
    if (!uid) return;
    await setDoc(doc(db, "faculty", uid), { ...data, uid });
    alert("✅ Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-purple-700 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">👨‍🏫 Faculty Profile</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-red-400"
          />

          <input
            type="text"
            placeholder="Domain (e.g. AI, Web Dev)"
            value={data.domain}
            onChange={(e) => setData({ ...data, domain: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="text"
            placeholder="Office Hours (e.g. Mon 2-4pm)"
            value={data.officeHours}
            onChange={(e) => setData({ ...data, officeHours: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="number"
            placeholder="Available Slots"
            value={data.slots}
            onChange={(e) => setData({ ...data, slots: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-purple-700 hover:bg-purple-900 text-white py-2 rounded transition"
          >
            💾 Save / Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
