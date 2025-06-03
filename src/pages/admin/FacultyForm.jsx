import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";

const FacultyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    slots: "",
    officeHours: "",
    imageURL: "https://randomuser.me/api/portraits/lego/4.jpg",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = uuidv4();

    try {
      await setDoc(doc(db, "faculty", uid), {
        ...formData,
        uid,
        slots: Number(formData.slots),
      });

      alert("✅ Faculty added successfully!");

      // Reset the form
      setFormData({
        name: "",
        email: "",
        domain: "",
        slots: "",
        officeHours: "",
        imageURL: "https://randomuser.me/api/portraits/lego/4.jpg",
      });
    } catch (err) {
      console.error("❌ Error adding faculty:", err);
      alert("Error adding faculty. Check the console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-xl mx-auto bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">Add New Faculty</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Domain (e.g. AI, Software Engg)"
        value={formData.domain}
        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Available Slots"
        value={formData.slots}
        onChange={(e) => setFormData({ ...formData, slots: e.target.value })}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Office Hours (e.g. Mon 2-4pm)"
        value={formData.officeHours}
        onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
        required
        className="w-full border p-2 rounded"
      />

      <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded w-full">
        ➕ Submit Faculty
      </button>
    </form>
  );
};

export default FacultyForm;
