import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router,  Route ,Routes} from 'react-router-dom';
import {database,auth,secondAuth } from './firebase';
import '@firebase/firestore'
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot , setDoc, query, where, getDocsFromCache} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider,  onAuthStateChanged,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import Home from './component/home';
import Header from './component/header';
import NotFound from './component/404not';
import ProfilePage from './component/profile-page';
import UserProfilePage from './component/user-profile-page';
import EditProfile from './component/edit-profile';
import ModalPosts from './component/modal-posts';
import LoginPage from './component/login-pages';
import RegisterPages from './component/register-pages';



class App extends React.Component{
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
    isLogin:false,
    uid:'',
    modal:false,
    akunUserName:'',
    akunFullName:'',
    totalFollow:null,
    totalFollowing:null,
    akunEmail:'',
    akunImages:'',
    totalPost:0,
    notif:[],
    isSubmit:false
  }
}

async componentDidMount(){
  const db = collection(database,'user')
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const q = query(db,where("uid","==" , uid))
        // GET USER LOGIN
        const users = {
          bool:true
        }
     await getDocs(q).then(res => {
          res.docs.map(item => {
          const data = item.data()
          console.log(data);
            return this.setState({ 
              akunUserName:this.state.akunUserName = data.username,
              akunImages:this.state.akunImages = data.images,
              totalPost:this.state.totalPost = data.total_post,
              akunFullName:this.state.akunFullName = data.fullname,
              akunEmail:this.state.akunEmail = data.email,
              totalFollow:this.state.totalFollow = data.total_follower,
              totalFollowing:this.state.totalFollowing = data.total_following
              })  
            });
          })
        
const db1 = collection(database,'notifikasi')
const q2 = query(db1 ,where("notif_id","==" ,this.state.akunEmail))
await getDocs(q2).then(res => {
res.docs.map(item => {
const data = item.data()
this.setState({notif:this.state.notif = data.notif})
})
})
       this.setState({
         isLogin:this.state.isLogin = true,
         uid:this.state.uid = uid
      })
       console.log('user log in');
      } else {
        // User is signed out

        this.setState({
          isLogin:this.state.isLogin = false,
          username:this.state.username = '',
          password:this.state.password = ''
        })
        console.log("user log out");
      }
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
      email:this.state.email,
      fullname:this.state.fullname,
      uid:ID,
      images:'',
      banner:'',
      private_message:[],
      biodata:'',
      link_website:'',
      phone:'',
      sent_message:[],
      total_following:0,
      total_follower:0,
      total_post:0,
    })
    .then(() => {
      this.setState({
        pesan:this.state.pesan = "Register sukses",
        sukses:this.state.sukses = true,
        error:this.state.error = false,
        load:this.state.load = true
      })
  this.setFollowers(ID)
  this.userNotif(ID)
    })  
  .catch((err) => {
    alert(`something wrong ${err}`)
    this.setState({
      pesan:this.state.pesan =`something wrong ${err}`,
      error:this.state.error = true,
      load:this.state.load = true,
      sukses:this.state.sukses = false
    })
    
  })
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
            pesan:this.state.pesan = "Register sukses",
            sukses:this.state.sukses = true,
            error:this.state.error = false,
            isSubmit:this.state.isSubmit = false
          })
          e.target.reset()
        }

  })
      .catch((error) => {
        const err= error.message;
        this.setState({
          pesan:this.state.pesan = err,
          error:this.state.error = true,
          load:this.state.load = true,
          sukses:this.state.sukses = false,
        })
      });
    
    }
    
    akunLogin = () => {
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const uid = user.uid
        this.setState({
          sukses:this.state.sukses = true,
          error:this.state.error = false,
          isSubmit:this.state.isSubmit = false,
          pesan:this.state.pesan = "Login Sukses",
          username:this.state.username = '',
          password:this.state.password = ''
        })  
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
          pesan:this.state.pesan = err,
          error:this.state.error = true,
          load:this.state.load = true,
          isSubmit:this.state.isSubmit = false
        })
      });
    }
      

logout = (e) => {
  e.preventDefault()
  auth.signOut();
  }
  
        
  registerValidasi = e => {
    e.preventDefault()


  if(this.state.username.indexOf(' ') >= 0){
  this.setState({
    pesan:this.state.pesan = "Username tidak boleh menggunakan spasi",
    error:this.state.error = true
  })
  }
  else if (this.state.username.length < 6) {
    this.setState({
      pesan:this.state.pesan = "Username minimal 6 karakter",
      error:this.state.error = true
    })
  }
  else if(this.state.fullname.length < 8){
    this.setState({
      pesan:this.state.pesan = "Fullname minimal 8 karakter",
      error:this.state.error = true
  })
  }
  else if(this.state.email.length < 10){
    this.setState({
      pesan:this.state.pesan = "Email minimal 10 karakter",
      error:this.state.error = true
  })
  }
  else if(this.state.email.indexOf(' ') >= 0){
    this.setState({
      pesan:this.state.pesan = "tidak boleh ada spasi pada email",
      error:this.state.error = true
  })
  }
  else if(this.state.password.indexOf(' ') >= 0){
    this.setState({
      pesan:this.state.pesan = "Password tidak boleh berisi spasi",
      error:this.state.error = true
  })
  }
  else if(this.state.password.length < 8){
    this.setState({
      pesan:this.state.pesan = "Password minimal 8 karakter",
      error:this.state.error = true
  })
  }
  else{
  this.registerAkun(e) 
  this.setState({isSubmit:this.state.isSubmit = true})
  }
  }
  
  loginValidasi = (e) => {
  e.preventDefault()
  if(this.state.email.length < 1){
    this.setState({
      pesan:this.state.pesan = "Email tidak boleh kosong",
      error:this.state.error = true
  })
  }else if(this.state.password < 1){
    this.setState({
      pesan:this.state.pesan = "Password tidak boleh kosong",
      error:this.state.error = true
  })
  }else{
  this.akunLogin() 
  this.setState({isSubmit:this.state.isSubmit = true})
  }
  }

openModal = (e) => {
e.preventDefault()
this.setState({hide:!this.state.hide});
}
  render(){
    return (
      <Router>
      <Header id={this.state.uid} openModal={this.openModal} isLogin={this.state.isLogin}/>
      
      <Routes>

      <Route path="/" element={<Home id={this.state.uid} total_follow={this.state.totalFollow} total_following={this.state.totalFollowing} fullname={this.state.akunFullName} name={this.state.akunUserName} avatar={this.state.akunImages} total_post={this.state.totalPost} />} />
      <Route path="/profile/:id" element={<ProfilePage id={this.state.uid}/>} />
      <Route path="/user-profile/" element={<UserProfilePage id={this.state.uid}  isLogin={this.state. isLogin} />} />
      <Route path="/edit-profile/:id" element={<EditProfile id={this.state.uid}/>} />
      <Route path="/login/" element={<LoginPage isSubmit={this.state.isSubmit} sukses={this.state.sukses}  error={this.state.error} pesan={this.state.pesan} loginValidasi={this.loginValidasi} handlerChange={this.handlerChange}/>} />
      <Route path="/register/" element={<RegisterPages isSubmit={this.state.isSubmit} sukses={this.state.sukses}  error={this.state.error} pesan={this.state.pesan} registerValidasi={this.registerValidasi} handlerChange={this.handlerChange }/>} />
      <Route path='*' element={<NotFound />} />
      </Routes>
<div className={this.state.hide ? 'modal' : 'modal is-active'}>
<ModalPosts id={this.state.uid} name={this.state.akunUserName} avatar={this.state.akunImages} total_post={this.state.totalPost} />
<button class="modal-close is-large" aria-label="close" onClick={this.openModal }></button>
</div>
      </Router>
        );
  }
}

export default App;

