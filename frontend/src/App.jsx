import {Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading the Realm...</div>
  }

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route  
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
      <Route  
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      
    </Routes>
  )
}

export default App
