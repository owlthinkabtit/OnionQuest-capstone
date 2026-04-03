import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" className="main-logo-text">
          Onion Quest
        </Link>
      </div>
      {/* <div className="nav-links">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
      </div> */}
    </nav>
  );
}

export default Navbar;
