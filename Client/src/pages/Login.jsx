  import { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="auth-card">
    <h2>Welcome Back</h2>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="name@company.com"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>
      <button type="submit" className="btn-primary">Sign In</button>
    </form>
    <div className="auth-footer">
      Don't have an account? <Link to="/register">Create one</Link>
    </div>
  </div>
  );
};

export default Login;
