import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome Back, {user?.username}!</h1>
      <p>Your active Campaigns will appear here.</p>
      <button onClick={handleLogout}>Leave the Realm</button>
    </div>
  );
}

export default Dashboard;