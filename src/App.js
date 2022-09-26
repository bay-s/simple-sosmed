import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router,  Route ,Routes} from 'react-router-dom';
import {database,auth} from './firebase';
import { collection, addDoc ,getDocs,query, where} from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth';

import Home from './component/home';
import Header from './component/header';
import NotFound from './component/404not';
import ProfilePage from './component/profile-page';
import UserProfilePage from './component/user-profile-page';
import EditProfile from './component/edit-profile';
import ModalPosts from './component/modal-posts';
import LoginPage from './component/login-pages';
import RegisterPages from './component/register-pages';
import PostDetail from './component/post-detail';
import MessageList from './component/message-list';
import MessageDetail from './component/message-detail';
import SendMessage from './component/send-message-form';

class App extends React.Component{
constructor(){
  super()
  this.state = {
    hide:true,
    isLogin:false,
    uid:'',
    modal:false,
    totalPost:0,
    notif:[],
    dataUser:[],
    akunEmail:''
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

     await getDocs(q).then(res => {
          res.docs.map(item => {
          const data = item.data()
          console.log(data);
            return this.setState({ 
              dataUser:data,
              akunEmail:data.email
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
     

logout = (e) => {
  e.preventDefault()
  auth.signOut();
  }
  
openModal = (e) => {
e.preventDefault()
this.setState({hide:!this.state.hide});
}
  render(){

    return (
      <Router>
      <Header id={this.state.uid} openModal={this.openModal} logout={this.logout} isLogin={this.state.isLogin}/>

      <Routes>

      {/* <Route path="/" element={<Home id={this.state.uid} dataUser={this.state.dataUser} />} exact/>
     */}

      <Route path="/" element={this.state.isLogin ? <Home id={this.state.uid} dataUser={this.state.dataUser} /> :<LoginPage />} />

      <Route path="/profile/:id" element={this.state.isLogin ? <ProfilePage id={this.state.uid}/> : <LoginPage />} />

      <Route path="/post/:id" element={this.state.isLogin ? <PostDetail id={this.state.uid} dataUser={this.state.dataUser}/> : <LoginPage  />} />

      <Route path="/message-list/" element={this.state.isLogin ? <MessageList  ID={this.state.uid} isLogin={this.state.isLogin} dataUser={this.state.dataUser}/> : <LoginPage />}/>

      <Route path="/message/:id" element={this.state.isLogin ? <MessageDetail ID={this.state.uid} isLogin={this.state.isLogin} dataUser={this.state.dataUser}/> : <LoginPage />}/>
      <Route path="/send-message/:id" element={this.state.isLogin ? <SendMessage dataUser={this.state.dataUser}  isLogin={this.state.isLogin} /> : <LoginPage />}/>
      <Route path="/edit-profile/:id" element={this.state.isLogin ? <EditProfile id={this.state.uid}/> : <LoginPage />} />

      <Route path="/login/" element={<LoginPage  isLogin={this.state.isLogin}/> } /> 
      <Route path="/register/" element={<RegisterPages />} /> 
      <Route path='*' element={<NotFound />} />
      </Routes>
<div className={this.state.hide ? 'modal' : 'modal is-active'}>
<ModalPosts id={this.state.uid} dataUser={this.state.dataUser}/>
<button class="modal-close is-large" aria-label="close" onClick={this.openModal }></button>
</div>
      </Router>
        );
  }
}

export default App;

