import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', dob: '', mobile: '', password: '', confirmPassword: '', gender: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
    } else {
      setPhotoFile(null);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { name, email, dob, mobile, password, confirmPassword, gender } = form;
    if (!name || !email || !dob || !mobile || !password || !gender) {
      setError('Please fill all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('dob', dob);
    formData.append('mobile', mobile);
    formData.append('password', password);
    formData.append('gender', gender);
    if (photoFile) formData.append('photo', photoFile);

    try {
      setLoading(true);
      // Backend URL - ensure backend is running on port 8080
      const res = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.status === 201) {
        // On successful signup, navigate to login page
        alert(data.message || 'User registered successfully');
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="row ">
        <div className="col-sm-12 sign-up">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Reserve a fixed area for messages so they don't push the layout when they appear */}
            <div style={{ minHeight: 40 }}>
              {error && <div className="alert alert-danger" style={{ margin: 0 }}>{error}</div>}
            </div>
            <h2 className='text-white text-center pt-2'>Join SkillSwap</h2>

            <input type="text" id='Name' className='form-control bg-transparent' name='name' value={form.name} onChange={handleChange} placeholder='Enter Your Full Name' />

            <input type="email" id='Email' className='form-control bg-transparent' name='email' value={form.email} onChange={handleChange} placeholder='Enter Your Email' />

            <input type="date" id='Dob' className='form-control bg-transparent' name='dob' value={form.dob} onChange={handleChange} />

            <input type="tel" id='Mobile' className='form-control bg-transparent' name='mobile' value={form.mobile} onChange={handleChange} placeholder='Enter Your Mobile No.' />
            <input type="password" id='Password' className='form-control bg-transparent' name='password' value={form.password} onChange={handleChange} placeholder='Enter Your Password' />

            <input type="password" id='ConfirmPassword' className='form-control bg-transparent' name='confirmPassword' value={form.confirmPassword} onChange={handleChange} placeholder='Confirm Your Password' />

            <label htmlFor="Gender" style={{ textAlign: 'left', fontSize: '18px', color: 'rgba(230, 230, 230, 1)' }}>Gender</label>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <input type="radio" id='Male' name='gender' value='male' checked={form.gender === 'male'} onChange={handleChange} />
              <label htmlFor="Male">Male</label>
              <input type="radio" id='Female' name='gender' value='female' checked={form.gender === 'female'} onChange={handleChange} />
              <label htmlFor="Female">Female</label>
            </div>

            <label htmlFor="photo" style={{ textAlign: 'left', fontSize: '18px', color: 'rgba(230, 230, 230, 1)' }}>Profile Photo</label>
            <input type="file" id='photo' name='photo' accept='image/*' className='form-control bg-transparent' onChange={handleFileChange} />
            <button type="submit" className='btn btn-primary form-control' disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
            <Link to="/login" style={{ textDecoration: 'none', textAlign: 'center', fontWeight: '500', color: 'blue', marginTop: '16px', display: 'block' }}>Already have an account? Login</Link>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Signup
