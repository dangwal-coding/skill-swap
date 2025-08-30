import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
        await response.json();
        alert('Login successful!');
        navigate('/home');
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
        <form action="" method='POST'>
          <h4 className='mb-4'>Login</h4>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='form-control bg-transparent' placeholder='Enter Email' /><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='form-control bg-transparent' placeholder='Enter Password' /><br /><br />
           <input
             type="submit"
             onClick={handleSubmit}
             className='form-control btn btn-primary'
             value={loading ? "Loading..." : "Login"}
             disabled={loading}
           />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <a href="#" style={{textDecoration: 'none', fontWeight: '500'}}>Forgot Password ?</a>
            <a href="#" style={{textDecoration: 'none', fontWeight: '500' }}>Create an Account</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
