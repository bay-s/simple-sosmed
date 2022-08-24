
import React from 'react'
import { Link } from 'react-router-dom';

function  LoginPage(props){

    return(
      <div className='register-container'>
              <div className='form-container'>
              <div className='forms-title'>
<h2>InstaClone</h2>
</div>
         <form className='forms' onSubmit={props.login}>
            <input type='email' name="email"  placeholder='email' onChange={props.Changes}/>
            <input type='password' name="password"  placeholder='Password' onChange={props.Changes}/>
        <button type="submit" className='sign-up-with'>Log in</button>
        </form>
        <div className='or'>
<span></span>
<p>Or</p>
 <span></span>
</div> 
<div className='forms-title'>
<i className="fa fa-brands fa-facebook-square"></i><a href='#'>Log in with facebook</a>
<div className='errors'>
          {props.error ? <p className='error'>{props.errMsg}</p> :  <p className='sukses'>{props.errMsg}</p>}
  </div>
<a href='#' className='forgot'>Forgot password?</a>
</div>
        </div>
        <div className='akun'>
            <p>Don't have an account?</p>
            <Link to="/register/"> Sign up</Link>
        </div>
      </div>
    )
}

export default LoginPage;
