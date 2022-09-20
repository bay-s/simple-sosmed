import React from 'react'
import { Link } from 'react-router-dom'
import banners from '../banner.jpg'
import {auth} from '../firebase';
import { signInWithPopup, GoogleAuthProvider,  onAuthStateChanged,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

class LoginPage extends React.Component{
constructor(){
  super()
  this.state = {
    hide:true,
    load:true,
    password:'',
    email:'',
    error:false,
    pesan:'',
    pesanSukses:'',
    sukses:false,
    disable:false,
    isSubmit:false,
  }
}


handlerChange = (e) => {
  const {name,value} = e.target
  this.setState(prev => {
    return{
 [name]:value
    }
  })
  
}

loginValidasi = (e) => {
  e.preventDefault()
  if(this.state.email.length < 1){
    this.setState({
      pesan:"Email tidak boleh kosong",
      error:true
  })
  }else if(this.state.password < 1){
    this.setState({
      pesan:"Password tidak boleh kosong",
      error:true
  })
  }else{
  this.akunLogin() 
  this.setState({isSubmit:true})
  }
  }

  akunLogin = () => {
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const uid = user.uid
      this.setState({
        sukses:true,
        error:false,
        isSubmit:false,
        pesan:"Login Sukses",
        username:'',
        password:''
      })  
      // window.location = "/";
    })
    .catch((error) => {
      const errorMsg = error.message;
      let err;
      if(error.code === 'auth/wrong-password'){
        err = "Email atau Password salah "
      }else if(error.code === 'auth/user-not-found'){
        err = "Akun tidak terdaftar"
      }
      else{
        err = errorMsg;
      }
      this.setState({
        pesan:err,
        error:true,
        load:true,
        isSubmit:false
      })
    });
  }

render(){
      
  const banner =  {
    backgroundImage:`url(${banners})`,
    height:`${200}px`
  }
  
  return(
    <div className='container my-fluid'>
            <div className='columns is-centered '>
      <div className='column is-6 box p-0 '>
             <div className='banner' style={banner}></div>
   <form className=' is-flex is-flex-direction-column is-flex-gap-md p-3' onSubmit={this.loginValidasi}>
              <p class="modal-card-title py-3 is-title">Login</p>
                   <div class="field">
     <p class="control has-icons-left has-icons-right">
       <input class="input is-large" type="email" name='email' placeholder="Email" onChange={this.handlerChange}/>
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
       <input class="input is-large" type="password" name='password' placeholder="Password" onChange={this.handlerChange}/>
       <span class="icon is-small is-left">
         <i class="fa fa-lock"></i>
       </span>
     </p>
   </div>
   
   <article class={this.state.error ? "message is-danger" : 'hide'}>
     <div class="message-body">
    <i> {this.state.pesan}</i>
     </div>
   </article>
   <article class={this.state.sukses ? "message is-success" : 'hide'}>
     <div class="message-body">
    <i> {this.state.pesan}</i>
     </div>
   </article>
   
   <div class="field">
     <p class="control ">
   
   
       {this.state.isSubmit ? <button class="button is-primary is-loading is-fullwidth is-title " disabled>
         Login
       </button>: <button type='submit' class="button is-primary is-fullwidth is-title">
       Login
       </button>}
     </p>
   </div>
    </form>
   <div class="field is-flex is-flex-gap-md is-justify-content-center py-4">
   <p className='is-title'>Don`t have an Account ?</p>
   <Link to='/register/' className='has-text-primary  is-title'>Sign Up</Link>
   </div>
   
             </div>
      </div>
            {/* END COLUMNS */}
   </div>
       )
}

}

export default LoginPage;