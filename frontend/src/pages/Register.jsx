import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate, Link} from "react-router-dom";

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
      setError("That Hero's name is already taken or something went wrong!");
    }
  }

  return (
    <div className="auth-container">
      <h2>Join the Quest</h2>
      { error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input  
          type="text"
          placeholder="Choose Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="choose Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Create Hero</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register