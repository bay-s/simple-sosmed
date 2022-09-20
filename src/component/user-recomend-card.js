import React from 'react'
import img from '../akun.jpg'
import {database} from '../firebase';
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot, setDoc, query, orderBy, where} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import ButtonFollow from './button-follow';

class UserRecomendCard extends React.Component{
constructor(){
  super()
  this.state = {
    total_user:[]
  }
}

async componentDidMount(){
  const db = collection(database,"user");

await getDocs(db).then(res => {
if (res) {
  this.setState({ 
    total_user:this.state.total_user = res.docs
   })  
  }
})

}

render(){

const userCard = this.state.total_user == 0 ? "" : this.state.total_user.map(user => { 
 const users = user.data();
 return users.total_follower > 3 ? <div className='user is-flex align-center justify-between'>
 <div className='is-flex is-flex-gap-sm align-center'>
 <figure className="image is-48x48 avatar">
  <img className="is-rounded" src={users.images === '' ? img : users.images } alt='avatar-image'/> 
</figure>
<h5 className='has-text-weight-bold is-size-7'>
 <Link to={`/profile/${users.uid}`} className='has-text-dark'>{users.username}</Link>
</h5>
</div>

 </div> : ""
   })
  //  END MAP
  return(
    <section className='carousel py-3 is-flex is-flex-column is-flex-gap-lg '>
       {userCard}
    </section>
        )
}
}

export default UserRecomendCard;