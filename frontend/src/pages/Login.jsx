import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import api from '../api/axios';
import { useNavigate } from "react-router";

function Login() {
  const [formData, setFormData] = useState({ username: '', password: ''});
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch(err) {
      setError('Invalid credentials. Did you forget your password, Hero?');
    }
  }

  return (
    <div className="auth-container">
      <h2>Hero Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Enter the Realm</button>
      </form>
    </div>
  );
}

export default Login;