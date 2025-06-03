import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRole("");
    setName("");
    navigate("/login");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role?.toLowerCase());
            setName(userData.name || userData.email.split("@")[0]); // fallback if no name field
          }
        } catch (err) {
          console.error("❌ Error fetching user doc:", err);
        }
      } else {
        setUser(null);
        setRole("");
        setName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-white hover:underline ${isActive(path) ? "font-bold underline" : ""}`;

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <li><Link to="/" className={navLinkClass("/")}>Home</Link></li>
          <li><Link to="/supervisors" className={navLinkClass("/supervisors")}>Supervisors</Link></li>
          <li><Link to="/contactus" className={navLinkClass("/contactus")}>Contact Us</Link></li>
          <li><Link to="/login" className={navLinkClass("/login")}>Login</Link></li>
          <li><Link to="/signup" className={navLinkClass("/signup")}>Sign Up</Link></li>
        </>
      );
    }

    const common = (
      <>
        <li><Link to="/" className={navLinkClass("/")}>Home</Link></li>
        <li><Link to="/contactus" className={navLinkClass("/contactus")}>Contact Us</Link></li>
      </>
    );

    const profile = (
      <li className="flex items-center space-x-2 text-white">
        <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-bold">
          {name?.[0]?.toUpperCase() || "U"}
        </div>
        <span className="hidden md:inline">{name}</span>
        <button onClick={handleLogout} className="ml-3 underline hover:text-red-300">Logout</button>
      </li>
    );

    if (role === "student") {
      return (
        <>
          {common}
          <li><Link to="/supervisors" className={navLinkClass("/supervisors")}>Supervisors</Link></li>
          <li><Link to="/student/dashboard" className={navLinkClass("/student/dashboard")}>Dashboard</Link></li>
          {profile}
        </>
      );
    }

    if (role === "faculty") {
      return (
        <>
          {common}
          <li><Link to="/faculty/dashboard" className={navLinkClass("/faculty/dashboard")}>Faculty Dashboard</Link></li>
          {profile}
        </>
      );
    }

    if (role === "admin") {
      return (
        <>
          {common}
          <li><Link to="/admin/dashboard" className={navLinkClass("/admin/dashboard")}>Admin Dashboard</Link></li>
          {profile}
        </>
      );
    }

    return null;
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-purple-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide cursor-pointer">
          FindMyFYP
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-sm items-center">
          {renderLinks()}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <span className={`block h-0.5 w-6 bg-white ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block h-0.5 w-6 bg-white ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-red-600 to-purple-700 px-6 pb-4">
          <ul className="flex flex-col space-y-4 font-medium text-sm" onClick={() => setMenuOpen(false)}>
            {renderLinks()}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
