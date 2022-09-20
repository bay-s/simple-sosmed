import React from 'react'
import { Link } from 'react-router-dom'
import {database,secondAuth } from '../firebase';
import { collection,doc, setDoc,serverTimestamp} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterPageLeft from './register-page-left';

class RegisterPages extends React.Component{
  constructor(){
    super()
    this.state = {
      hide:true,
      load:true,
      password:'',
      email:'',
      fullname:'',
      username:'',
      error:false,
      pesan:'',
      pesanSukses:'',
      sukses:false,
      disable:false,
      isSubmit:false,
    }
  }

      
registerValidasi = e => {
  e.preventDefault()

if (this.state.username.length < 1) {
  this.setState({
    pesan:"Username can't be empty",
    error:true,
    sukses:false
  })
}
else if(this.state.username.indexOf(' ') >= 0){
this.setState({
  pesan:"Username tidak boleh menggunakan spasi",
  error:true,
  sukses:false
})
}
else if (this.state.username.length < 6) {
  this.setState({
    pesan:"Username minimal 6 karakter",
    error:true,
    sukses:false
  })
}
else if(this.state.fullname.length < 8){
  this.setState({
    pesan:"Fullname minimal 8 karakter",
    error:true,
    sukses:false
})
}
else if(this.state.email.length < 10){
  this.setState({
    pesan:"Email minimal 10 karakter",
    error:true,
    sukses:false
})
}
else if(this.state.email.indexOf(' ') >= 0){
  this.setState({
    pesan:"tidak boleh ada spasi pada email",
    error:true,
    sukses:false
})
}
else if(this.state.password.indexOf(' ') >= 0){
  this.setState({
    pesan:"Password tidak boleh berisi spasi",
    error:true,
    sukses:false   
})
}
else if(this.state.password.length < 8){
  this.setState({
    pesan:"Password minimal 8 karakter",
    error:true,
    sukses:false
})
}
else{
this.registerAkun(e) 
this.setState({isSubmit:true})
}
}

registerAkun = (e) => {
  this.setState({load:this.state.load = false})  
      createUserWithEmailAndPassword(secondAuth ,this.state.email,this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const ID = user.uid
        if(userCredential){
          this.createAkun(ID) 
          this.setState({
            pesan:"Register sukses",
            sukses:true,
            error:false,
            isSubmit:false
          })
          e.target.reset()
        }

  })
      .catch((error) => {
        const err= error.message;
        this.setState({
          pesan:err,
          error:true,
          load:true,
          sukses:false,
          isSubmit:false
        })
      });
    
    }

    handlerChange = (e) => {
      const {name,value} = e.target
      this.setState(prev => {
        return{
     [name]:value
        }
      })
      
    }
    
    userNotif = (ID) => {
      const notif = collection(database,'notifikasi')
      setDoc(doc(notif,ID), {
            notif_id:this.state.email,
            notif_likes:[],
            notif_comment:[],
            notif_messages:[],
            notif_following:[],
            notif_follower:[],
         })      
        .then(() => {console.log('sukses');})  
        .catch((err) => {alert(`something wrong ${err}`)})
        }
      
      setFollowers = (ID) => {
        const user_followers = collection(database,'user_follower')
      setDoc(doc(user_followers ,ID), {
        follower:[],
        following:[],
        uid:ID
          })
        .then(() => {console.log('sukses');})  
        .catch((err) => {alert(`something wrong ${err}`)})
       }
    
    createAkun = (ID) => {
      const db = collection(database,'user')    
      setDoc(doc(db,ID), {
          username:this.state.username,
          fullname:this.state.fullname,
          email:this.state.email,
          uid:ID,
          avatar:'',
          banner:'',
          biodata:'',
          link_website:'',
          phone:'',
          job_title:'',
          skills:'',
          private_message:[],
          sent_message:[],
          total_following:0,
          total_follower:0,
          total_post:0,
          timestamp: serverTimestamp()
        })
        .then(() => {
          this.setState({
            pesan:"Register sukses",
            sukses:true,
            error:false,
            load:true
          })
      this.setFollowers(ID)
      this.userNotif(ID)
        })  
      .catch((err) => {
        alert(`something wrong ${err}`)
        this.setState({
          pesan:`something wrong ${err}`,
          error:true,
          load:true,
          sukses:false
        })
        
      })
     }

     render(){

      return(
<section className='container my-fluid'>
<div className='columns is-centered is-multiline is-gapless'>
{/* start col left */}
<div className='column is-5 p-0 box'>
 <RegisterPageLeft pesan={this.state.pesan} error={this.state.error} sukses={this.state.sukses}/>
</div>
 {/* end col left */}
           <div className='column is-5 p-0 box'>
           <form className=' is-flex is-flex-direction-column is-flex-gap-md p-5' onSubmit={this.registerValidasi}>
        <p class="mb-2 py-3 has-text-info is-size-3 main-title">Register</p>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input is-large" type="text" name='username' placeholder="Username"  onChange={this.handlerChange}/>
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </div>
        {/* END USERNAME FIELD */}
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input is-large" type="text" name='fullname' placeholder="Full name" onChange={this.handlerChange}/>
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </div>
          {/* END FULLNAME FIELD */}    

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
          {/* END EMAIL FIELD */}    
        <div class="field ">
          <p class="control has-icons-left">
            <input class="input is-large" type="password" name='password' placeholder="Password" onChange={this.handlerChange}/>
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
            {/* END PASSWORD FIELD */}  

        <div class="field">
          <p class="control">
        {this.state.isSubmit ? <button class="button is-link is-loading is-title is-fullwidth" disabled>
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
}

export default RegisterPages;