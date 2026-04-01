import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      login(response.data.user, response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Did you forget your password, Hero?");
    }
  }

  return (
    <div className="login-container">
      <div className="hero-section">
        <h1>Onion Quest</h1>
        <p>A fantasy-RPG inspired task manager app</p>
      </div>
      {error && (
        <p style={{ color: "red", backgroundColor: "white", padding: "5px" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="quest-input-area"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          className="quest-input-area"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit" className="login-btn">
          Enter the Realm
        </button>
      </form>
      <div className="auth-options">
        <p>New to the Realm?</p>
        <Link title="Go to Register" to="/register">
          <button type="button">Create an Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
