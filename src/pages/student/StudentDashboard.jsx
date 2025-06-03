import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [idea, setIdea] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdea = async () => {
      const userId = auth.currentUser?.uid;
      const q = query(collection(db, "ideas"), where("studentId", "==", userId));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const ideaData = snapshot.docs[0].data();
        setIdea(ideaData);

        const supervisorRef = doc(db, "faculty", ideaData.supervisorId);
        const supSnap = await getDoc(supervisorRef);
        if (supSnap.exists()) {
          setSupervisor(supSnap.data());
        }
      }
    };

    fetchIdea();
  }, []);

  const handleDownload = () => {
    const element = document.getElementById("ideaDetails");
    html2pdf().from(element).save("FYP_Idea.pdf");
  };

  if (!idea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-red-500 text-white px-4">
        <h2 className="text-2xl font-bold mb-4">You haven’t submitted any FYP idea yet.</h2>
        <button
          onClick={() => navigate("/student/idea-form")}
          className="mt-4 bg-white text-purple-700 font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          ➕ Submit New Idea
        </button>
      </div>
    );
  }

  const canResubmit = idea.status === "rejected" || idea.status === "revision";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-red-500 py-10 px-6">
      <div className="relative max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-gray-800">
        <div id="ideaDetails">
          <h2 className="text-3xl font-bold text-red-600 mb-4">🎓 Your FYP Idea</h2>
          <p className="mb-2"><strong>Title:</strong> {idea.title}</p>
          <p className="mb-2"><strong>Description:</strong> {idea.description}</p>
          <p className="mb-2"><strong>Status:</strong> <span className="capitalize text-blue-600">{idea.status}</span></p>
          {idea.status === "revision" && (
            <p className="text-red-600 mt-2">📝 Revision Note: {idea.revisionNote || "N/A"}</p>
          )}
          {supervisor && (
            <p className="mt-2"><strong>Supervisor:</strong> {supervisor.name}</p>
          )}
        </div>

        <div className="mt-6 flex gap-4 flex-wrap">
          <button
            onClick={handleDownload}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            ⬇️ Download as PDF
          </button>
          <a
            href="/supervisors"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            🔍 Browse Supervisors
          </a>
          {canResubmit && (
            <a
              href="/student/idea-form"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              🔁 Resubmit Idea
            </a>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/student/idea-form")}
        className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white text-3xl w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition"
        title="Submit New Idea"
      >
        +
      </button>
    </div>
  );
};

export default StudentDashboard;
