import React from 'react'
import { Link } from 'react-router-dom';

function RegisterPage(props){

    return(
      <div className='register-container'>
              <div className='form-container'>
            <div className='forms-title'>
                <h2>InstaClone</h2>
                <p>Sign up to see photos and videos from your friends.</p>
                <button className='sign-up-with'>Log in with facebook</button>
            </div>
           <div className='or'>
            <span></span>
            <p>Or</p>
            <span></span>
           </div> 
         <form className='forms' onSubmit={props.register}>
            <input type='email' name="email" className={props.error ? 'input-error' : ''} placeholder='Email' onChange={props.Changes}/>
            <input type='text' name="fullname" className={props.error ? 'input-error' : ''} placeholder='Fullname' onChange={props.Changes}/>
            <input type='text' name="username" className={props.error ? 'input-error' : ''} placeholder='Username' onChange={props.Changes}/>
            <input type='password' name="password"  className={props.error ? 'input-error' : ''} placeholder='Password' onChange={props.Changes}/>
           {props.disable ? <button type="button"
         className='sign-up'  disabled>Sign up</button> : <button type="submit" className='sign-up-with'>Sign up</button>}
        </form>
        <div className='errors'>
          {props.error ? <p className='error'>{props.errMsg}</p> :  <p className='sukses'>{props.errMsg}</p>}
        </div>
        </div>

        <div className='akun'>
            <p>Have an account?</p>
            <Link to="/">Log in</Link>
        </div>
      </div>
    )
}

export default RegisterPage;