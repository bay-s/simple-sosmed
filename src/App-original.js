
import './App.css';
import React from 'react';
import {database,auth,secondAuth } from './firebase';
import '@firebase/firestore'
import { BrowserRouter as Router, Switch, Route ,Routes} from 'react-router-dom';
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot , setDoc, query, where} from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider,  onAuthStateChanged,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterPage from './component/register-page';
import NotFound from './component/404not';
import LoginPage from './component/login-page';
import 'font-awesome/css/font-awesome.min.css';
import AccountPage from './component/accont-page';
import PostPage from './component/post';
import AccountDetail from './component/account-detail';
import Post from './component/post-detail';
import Header from './component/header';
import ModalPost from './component/modal-post';



class App extends React.Component {
  constructor(){
    super()
    this.state = {
    data:collection(database,'user'),
    password:'',
    email:'',
    fullname:'',
    username:'',
    error:false,
    errorMessage:'',
    sukses:false,
    disable:false,
    isLogin:false,
    uid:'',
    modal:false,
    akunUserName:'',
    akunImages:'',
    totalPost:0,
    }
  }

componentDidMount(){
  const db = collection(database,'user')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const q = query(db,where("uid","==" , uid))
        // GET USER LOGIN
     getDocs(q).then(res => {
          res.docs.map(item => {
          const data = item.data()
          console.log(data);
            return this.setState({ 
              akunUserName:this.state.akunUserName = data.username,
              akunImages:this.state.akunImages = data.images,
              totalPost:this.state.totalPost = data.total_post
              })  
            });
          })
        
       this.setState({
         isLogin:this.state.isLogin = true,
         uid:this.state.uid = uid
      })
       console.log('user log in');
      } else {
        // User is signed out
        this.setState({isLogin:this.state.isLogin = false})
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

  if(this.state.username.length < 8 && this.state.email.length < 8 && this.state.password.length < 8 || this.state.fullname.length < 8) {
    this.setState({
      disable:this.state.disable = true
    })
    }else{
      disable:this.state.disable = false
    }

  }


registerAkun = (e) => {
  e.preventDefault()
  createUserWithEmailAndPassword(secondAuth ,this.state.email,this.state.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.setState({
      errorMessage:"Register sukses",
      sukses:true
    })
  alert("REGISTER SUKSES")
  const db = this.state.data
  const dbUserInfo = collection(database,'user-info')

setDoc(doc(db,user.uid), {
    username: this.state.username,
    email:this.state.email,
    fullname:this.state.fullname,
    uid:user.uid,
    images:''
  })
setDoc(doc(dbUserInfo,user.uid), {
bio:"",
info_id:user.uid,
following:0,
follower:0,
post:0,
website:'',
username:this.state.username
  })
  .then(() => {
  this.setState({
  error:this.state.error = false,
  errorMessage:"Register sukses"
})
  })  
  .catch((err) => {
  this.setState({errorMessage:err})
  })

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMsg = error.message;
    this.setState({
      errorMessage:errorCode,
      error:true,
      sukses:false
    })
  });



}

akunLogin = (e) => {
  e.preventDefault()
  
  signInWithEmailAndPassword(auth, this.state.email, this.state.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const uid = user.uid
      //  this.setState({
      //    isLogin:this.state.isLogin = true,
      //    uid:this.state.uid = uid
      // })
    alert("LOGIN SUKSES")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMsg = error.message;

    this.setState({
      errorMessage:errorMsg,
      error:this.state.error = true
    })
  });
}


modalForm = (e) => {
  e.preventDefault()
  this.setState({modal:!this.state.modal})
  console.log(this.state.modal);
}

logout = (e) => {
e.preventDefault()
auth.signOut();
}

removeModal = (e) =>{
  e.preventDefault()
  this.setState({ modal:!this.state.modal})
}

render(){

  return (
    <div className="App" onSubmit={this.register}>
<Router>
<Header openModal={this.modalForm} logout={this.logout} isLogin={this.state.isLogin} />
<Routes>
     <Route path="/" element={this.state.isLogin ? <PostPage id={this.state.uid}/> : <LoginPage Changes={this.handlerChange} disable={this.disable}  login={this.akunLogin}  error={this.state.error} errMsg={this.state.errorMessage}/> }exact/>
     {/* <Route path="/" element={<LoginPage Changes={this.handlerChange} disable={this.disable}  login={this.akunLogin}  error={this.state.error} errMsg={this.state.errorMessage}/> }exact/> */}
     <Route path="/register/" element={<RegisterPage Changes={this.handlerChange}  register={this.registerAkun} error={this.state.error} errMsg={this.state.errorMessage} disable={this.disable} />} />
     <Route path='/account/:id' element={this.state.isLogin ? <AccountPage id={this.state.uid} name={this.state.akunUserName} /> : <LoginPage Changes={this.handlerChange} disable={this.disable}  login={this.akunLogin}  error={this.state.error} errMsg={this.state.errorMessage}/> } />
     <Route path='/account-detail/:id' element={this.state.isLogin ? <AccountDetail ids={this.state.uid} name={this.state.akunUserName}/> : <LoginPage Changes={this.handlerChange} disable={this.disable}  login={this.akunLogin}  error={this.state.error} errMsg={this.state.errorMessage}/> } />
     <Route path='/post/:id' element={<Post />} />
     <Route path='*' element={<NotFound />} />
</Routes>
<div className={this.state.modal ? 'modals' : "modal-container"}>
{this.state.modal ? <ModalPost removeModal={this.removeModal} Post={this.state.totalPost} id={this.state.uid} userName={this.state.akunUserName} images={this.state.akunImages} />  : ""}
<div className={this.state.modal ? 'close' : "hide"}>
<i class="fa fa-times" aria-hidden="true" onClick={this.removeModal}></i>
</div>
</div>
</Router>
  </div>
  )
}

}

export default App;

