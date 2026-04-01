import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      login(response.data.user, response.data.token);

      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "The Gatekeeper is blocked. Try again";
      setError(errorMessage);
      console.log("Full Error Object:", err.response?.data);
    }
  }

  return (
    <div className="login-container">
      <div className="hero-section">
        <h1>Join the Guild</h1>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="quest-input-area"
          type="text"
          placeholder="Choose Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="quest-input-area"
          type="password"
          placeholder="Choose Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Begin Your Journey</button>
      </form>
      <div className="auth-options">
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
