import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

const IdeaForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [ideaDocId, setIdeaDocId] = useState(null); // for update
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchSupervisors = async () => {
      const snapshot = await getDocs(collection(db, "faculty"));
      setSupervisors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchExistingIdea = async () => {
      const userId = auth.currentUser?.uid;
      const q = query(collection(db, "ideas"), where("studentId", "==", userId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        const idea = docSnap.data();
        setIdeaDocId(docSnap.id);
        setTitle(idea.title || "");
        setDescription(idea.description || "");
        setSupervisorId(idea.supervisorId || "");
      }
    };

    fetchSupervisors();
    fetchExistingIdea();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    if (ideaDocId) {
      // Existing idea — update
      await updateDoc(doc(db, "ideas", ideaDocId), {
        title,
        description,
        supervisorId,
        status: "pending",
        revisionNote: "",
      });
      alert("Idea updated!");
    } else {
      // New idea — add
      await addDoc(collection(db, "ideas"), {
        title,
        description,
        supervisorId,
        studentId: userId,
        status: "pending",
      });
      alert("Idea submitted!");
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-center mt-8 text-green-600 font-semibold">
        Idea submitted successfully!
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">{ideaDocId ? "Resubmit / Edit Idea" : "Submit Your FYP Idea"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <select
          value={supervisorId}
          onChange={e => setSupervisorId(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Supervisor</option>
          {supervisors.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">
          {ideaDocId ? "Update Idea" : "Submit Idea"}
        </button>
      </form>
    </div>
  );
};

export default IdeaForm;
