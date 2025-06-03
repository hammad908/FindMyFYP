import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      const snapshot = await getDocs(collection(db, "faculty"));
      setFaculty(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchFaculty();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "faculty", id));
    alert("Deleted!");
    window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Faculty List</h2>
      {faculty.length === 0 ? (
        <p className="text-gray-600">No faculty added yet.</p>
      ) : (
        faculty.map((f) => (
          <div key={f.id} className="border p-4 mb-4 rounded shadow bg-white">
            <p><strong>Name:</strong> {f.name}</p>
            <p><strong>Email:</strong> {f.email}</p>
            <p><strong>Domain:</strong> {f.domain}</p>
            <p><strong>Slots:</strong> {f.slots}</p>
            <p><strong>Office Hours:</strong> {f.officeHours}</p>
            <div className="flex gap-4 mt-2">
              <Link to={`/admin/faculty-form?id=${f.id}`} className="bg-blue-600 text-white px-4 py-1 rounded">Edit</Link>
              <button onClick={() => handleDelete(f.id)} className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FacultyList;
