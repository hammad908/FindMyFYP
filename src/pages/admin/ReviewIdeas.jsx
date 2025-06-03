import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";

const ReviewIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const snapshot = await getDocs(collection(db, "ideas"));
        const data = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const idea = docSnap.data();
            const supervisorId = idea.supervisorId || "";
            let supervisorName = "Unknown";

            if (supervisorId.trim() !== "") {
              try {
                const supDoc = await getDoc(doc(db, "faculty", supervisorId));
                if (supDoc.exists()) {
                  supervisorName = supDoc.data().name || "Unnamed Supervisor";
                }
              } catch (e) {
                console.warn("⚠️ Supervisor fetch failed:", supervisorId);
              }
            }

            return {
              id: docSnap.id,
              ...idea,
              supervisorName,
            };
          })
        );
        setIdeas(data);
      } catch (error) {
        console.error("❌ Failed to fetch ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const updateStatus = async (id, status, note = "") => {
    const idea = ideas.find((i) => i.id === id);
    await updateDoc(doc(db, "ideas", id), {
      status,
      revisionNote: note,
    });

    if (status === "accepted" && idea?.supervisorId) {
      await updateDoc(doc(db, "faculty", idea.supervisorId), {
        slots: increment(-1),
      });
    }

    alert(`Idea marked as ${status.toUpperCase()}`);
    window.location.reload();
  };

  const deleteIdea = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this idea?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "ideas", id));
      setIdeas((prev) => prev.filter((i) => i.id !== id));
      alert("Idea deleted successfully.");
    } catch (err) {
      console.error("Failed to delete idea:", err);
      alert("Deletion failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-red-600 p-6">
      <div className="max-w-6xl mx-auto text-white">
        <h2 className="text-3xl font-bold text-center mb-6">📋 Review Submitted FYP Ideas</h2>

        {loading ? (
          <p className="text-center text-white mb-4">Loading ideas...</p>
        ) : ideas.length === 0 ? (
          <p className="text-center text-gray-300">No ideas submitted yet.</p>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white text-gray-800 rounded-xl shadow-lg p-6 mb-6"
            >
              <p><strong>Title:</strong> {idea.title}</p>
              <p><strong>Description:</strong> {idea.description}</p>
              <p><strong>Supervisor:</strong> {idea.supervisorName}</p>
              <p><strong>Status:</strong>{" "}
                <span className="capitalize text-blue-600">{idea.status}</span>
              </p>
              {idea.status === "revision" && (
                <p className="text-red-600 mt-1">📝 Note: {idea.revisionNote || "N/A"}</p>
              )}

              <div className="flex gap-3 mt-4 flex-wrap">
                <button
                  onClick={() => updateStatus(idea.id, "accepted")}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(idea.id, "rejected")}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    const note = prompt("Enter revision note:");
                    if (note) updateStatus(idea.id, "revision", note);
                  }}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Ask for Revision
                </button>
                <button
                  onClick={() => deleteIdea(idea.id)}
                  className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewIdeas;
