import React from 'react'
import {Link} from 'react-router-dom';
import './Signup.css'
function Signup() {
  return (
    <div>
       <div className="row ">
            <div className="col-sm-12 sign-up">
                <form action="" method='POST'>
                    <h2 className='text-white text-center pt-5'>Join SkillSwap</h2>

                    <input type="text" id='Name' className='form-control bg-transparent'  name='name'  placeholder='Enter Your Full Name'/>

                    <input type="email" id='Email' className='form-control bg-transparent'  name='email'  placeholder='Enter Your Email'/>

                    <input type="date" id='Dob' className='form-control bg-transparent'  name='dob' />

                    <input type="tel" id='Mobile' className='form-control bg-transparent'  name='mobile'  placeholder='Enter Your Mobile No.'/>
                    <input type="password" id='Password' className='form-control bg-transparent'  name='password'  placeholder='Enter Your Password'/>

                    <input type="password" id='ConfirmPassword' className='form-control bg-transparent'  name='confirmPassword'  placeholder='Confirm Your Password'/>
                    <label htmlFor="Gender" style={{textAlign:'left', fontSize:'18px', color:'rgba(230, 230, 230, 1)'}}>Gender</label>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                        <input type="radio" id='Male' name='gender' value='male' />
                        <label htmlFor="Male">Male</label>
                        <input type="radio" id='Female' name='gender' value='female' />
                        <label htmlFor="Female">Female</label>
                    </div>
                    <label htmlFor="photo" style={{textAlign:'left', fontSize:'18px', color:'rgba(230, 230, 230, 1)'}}>Profile Photo</label>
                    <input type="file" id='photo' name='photo' accept='image/*' className='form-control bg-transparent' />
                    <button type="submit" className='btn btn-primary form-control'>Create Account</button>
                    <Link to="/login" style={{textDecoration: 'none', textAlign: 'center', fontWeight: '500'}}>Already have an account? Login</Link>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Signup
