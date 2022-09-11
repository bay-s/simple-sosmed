import React from 'react'
import { Link } from 'react-router-dom'
import banners from '../banner2.jpg'

function RegisterPages(props){

const banner =  {
  backgroundImage:`url(${banners})`,
  height:`${200}px`
}


    return(
<section className='container my-fluid'>
<div className='columns is-centered is-multiline is-gapless'>
  <div className='column is-5 p-0 box'>
   <div className='banner' style={banner}></div>
    <div className='is-flex is-flex-column is-flex-gap-lg p-3 text-center H-100'>
       <h3 className='title main-title  is-1 is-bold'>
       Simple Sosmed
       </h3>
       <h4 className='is-title is-size-5 has-text-link is-bold'>
       Social media sederhana untuk share project portofolio.
       </h4>
       <p className='has-text-grey-light is-bold is-size-6 lh-sm'>
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis ex deleniti aliquam tempora libero excepturi vero soluta odio optio sed.
       </p>

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
    </div>
   </div>
   <div className='column is-5 p-0 box'>
   <form className=' is-flex is-flex-direction-column is-flex-gap-md p-5' onSubmit={props.registerValidasi}>
<p class="mb-2 py-3 has-text-info is-size-3 main-title">Register</p>
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

<div class="field">
  <p class="control">
{props.isSubmit ? <button class="button is-link is-loading is-title is-fullwidth" disabled>
     Register </button> : <button type='submit' class="button is-link is-title is-fullwidth">
     Register
    </button>}
  </p>
  
</div>
  </form>
<div class="field is-flex is-flex-gap-md is-justify-content-center pb-4">
<p className='is-title'>Already have an Account ?</p>
<Link to='/login/' className='has-text-info has-text-weight-bold is-title'>Login</Link>
</div>
   </div>
   </div>
         {/* END COLUMNS */}
</section>
    )
}

export default RegisterPages;