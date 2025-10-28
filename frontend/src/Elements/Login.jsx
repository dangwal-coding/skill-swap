import React from 'react'
import { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (response.ok) {
        const user = await response.json();
        // store token and full user object so other pages can show profile info
        try {
          const tokenValue = user._id || user.email || JSON.stringify(user);
          localStorage.setItem('token', tokenValue);
        } catch {
          localStorage.setItem('token', 'true');
        }
        try {
          // Save entire user object if backend returns it
          localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
          console.warn('Could not persist user object', e);
        }
        // notify other parts of the app in this tab about auth change
        try {
          window.dispatchEvent(new Event('authChanged'));
        } catch (_e) {
          // ignore dispatch errors in very old browsers but keep variable used for lint
          console.debug('auth dispatch failed', _e);
        }
        alert('Login successful!');
        navigate('/user');
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className='row'>
      <div className="col-sm-12 sign-in">
        <form onSubmit={handleSubmit}>
          <h4 className='mb-4'>Login</h4>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='form-control bg-transparent' placeholder='Enter Email' /><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='form-control bg-transparent' placeholder='Enter Password' /><br />
           <input
             type="submit"
             className='form-control btn btn-primary'
             value={loading ? "Loading..." : "Login"}
             disabled={loading}
           />
        </form>
        <div style={{ textAlign: 'center', marginTop: '16px' ,color:'blue'}}>
          <Link to="#" style={{textDecoration: 'none', fontSize: '18px', fontWeight: '600', marginRight: '24px'}}>Forgot Password ?</Link>
          <Link to="/Signup" style={{textDecoration: 'none', fontWeight: '600', fontSize: '18px'}}>Create an Account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
