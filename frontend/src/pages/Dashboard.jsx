import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome Back, {user?.username}!</h1>
      <p>Your active Campaigns will appear here.</p>
      <button onClick={logout}>Leave the Realm (Logout)</button>
    </div>
  );
}

export default Dashboard;