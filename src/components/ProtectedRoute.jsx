import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({ children, allowedRole }) {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) {
      setChecking(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setRole(null); // fallback if user doc not found
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError(true);
      } finally {
        setChecking(false);
      }
    };

    fetchRole();
  }, [user]);

  if (loading || checking) return <div>Loading...</div>;
  if (error) return <div>Something went wrong while checking role.</div>;
  if (!user || role !== allowedRole) return <Navigate to="/login" />;

  return children;
}
