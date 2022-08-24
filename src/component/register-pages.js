import React from 'react'
import banners from '../banner2.jpg'

function RegisterPages(props){

const banner =  {
  backgroundImage:`url(${banners})`,
  height:`${200}px`
}

    return(
 <div className='container my-fluid'>
         <div className='columns is-centered '>
   <div className='column is-6 box p-0 '>
          <div className='banner' style={banner}></div>
<form className=' is-flex is-flex-direction-column is-flex-gap-md p-5' onSubmit={props.registerValidasi}>
           <p class="modal-card-title py-3 is-title">Register</p>

<div class="field">
  <div class="control has-icons-left has-icons-right">
    <input class="input is-large" type="text" name='fullname' placeholder="Full name" onChange={props.handlerChange}/>
    <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fa fa-check"></i>
    </span>
  </div>
</div>

<div class="field">
  <div class="control has-icons-left has-icons-right">
    <input class="input is-large" type="text" name='username' placeholder="Username"  onChange={props.handlerChange}/>
    <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fa fa-check"></i>
    </span>
  </div>
</div>

<div class="field">
  <p class="control has-icons-left has-icons-right">
    <input class="input is-large" type="email" name='email' placeholder="Email" onChange={props.handlerChange}/>
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fa fa-check"></i>
    </span>
  </p>
</div>

<div class="field ">
  <p class="control has-icons-left">
    <input class="input is-large" type="password" name='password' placeholder="Password" onChange={props.handlerChange}/>
    <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
  </p>
</div>


<article class={props.error ? "message is-danger" : 'hide'}>
  <div class="message-body">
 <i> {props.pesan}</i>
  </div>
</article>
<article class={props.sukses ? "message is-success" : 'hide'}>
  <div class="message-body">
 <i> {props.pesan}</i>
  </div>
</article>

<div class="field">
  <p class="control">
{props.isSubmit ? <button class="button is-link is-title" disabled>
     Register </button> : <button type='submit' class="button is-link is-title">
     Register
    </button>}
  </p>
  
</div>
                </form>
<div class="field is-flex is-flex-gap-md is-justify-content-center pb-4">
<p className='is-title'>Already have an Account ?</p>
<a href='#0' className='has-text-info has-text-weight-bold is-title'>Login</a>
</div>
          </div>
   </div>
         {/* END COLUMNS */}
</div>
    )
}

export default RegisterPages;