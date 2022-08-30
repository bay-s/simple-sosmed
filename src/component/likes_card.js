import React from 'react'
import {database} from '../firebase';
import { Link } from 'react-router-dom'
import { collection, getDocs,query, where,doc,updateDoc,addDoc,arrayUnion,serverTimestamp, arrayRemove} from 'firebase/firestore';



class LikesCard extends React.Component{
constructor(){
super()
this.state = {
    likes_id:[],
    isLikes:false,
    uniqId:'',
    total:null
}
}


async componentDidMount(){
    const id = this.props.id

    const likes = collection(database, 'post_likes')
    const queryUser = query(likes, where("likes_post_id", "==", this.props.post_id))
    // GET USER LIKES ID

    await getDocs(queryUser).then(res => {
        res.docs.map(item => {
            const data = item.data()
            data.user_likes_id.map(f_id => {
                if (f_id === id) {
                    this.setState({
                        likes_id: this.state.likes_id = data.user_likes_id,
                        isLikes: this.state.isLikes = true
                    })
                } else {
                    console.log("salah");
                }
            })

        });
    })
}

async componentDidUpdate(){

  const likes = collection(database,'post_likes')
  const queryUser = query(likes ,where("likes_post_id","==" ,this.props.post_id))
               // GET USER LIKES
                                 // GET USER LIKES ID

    await getDocs(queryUser).then(res => {
        res.docs.map(item => {
            const data = item.data()
            data.user_likes_id.map(f_id => {
                if (f_id === this.props.id) {
                    this.setState({
                        likes_id: this.state.likes_id = data.user_likes_id,
                        isLikes: this.state.isLikes = true
                    })
                } else {
                    this.setState({
                        // isLikes:this.state.isLikes = false
                    })
                }
            })

        });
    })
}

likesNotif = (id) => {
    const notif_id = this.props.id
    const docUpdate = doc(database,'notifikasi',notif_id ) // ADD NOTIF
    
      updateDoc(docUpdate,{
                notif:arrayUnion({
                    pesan:`${this.props.name} Telah menyukai postingan anda`,
                    user_name:this.props.name,
                    user_id:this.props.id,
                    user_avatar:this.props.avatar,
                    post_id:id
                  })
          })
    .then(() => {console.log("notif me senpai")})
    .catch((err) => {console.log(err)}); 
    
    }
    
    likesPost = (e) => {
    e.preventDefault()
    const id = this.props.post_id
    const ranID = Math.random().toString(36).substring(2,36);
    const docUpdate = doc(database,'post',id ) 
    const docUpdates = doc(database,'post_likes',id) 
    if(e.target.dataset.id === id){
      if(e.target.classList.contains('likes')){
        console.log("ada like");
        e.target.classList.remove('likes')
        updateDoc(docUpdates,{user_likes_id:arrayRemove(this.props.id)})
        updateDoc(docUpdate, {
          total_likes: this.state.total - 1
        })
          .then(() => {alert("remove likes sukses")})
          .catch((err) => {alert(err)}); 
          }
          else{
            console.log("tidakada like");
            e.target.classList.add('likes')
            // this.likesNotif(id)
            updateDoc(docUpdate, {
              total_likes: this.state.total + 1
            })
            updateDoc(docUpdates,{user_likes_id:arrayUnion(this.props.id)})
            .then(() =>{console.log("add likes sukses");})
            .catch(err => {alert(err);}) 
          }
      }
    
    }

render(){
    const is_likes = this.state.isLikes ? <i className="fa fa-heart likes is-size-5 is-clickable"  data-id={this.props.post_id} onClick={this.likesPost}></i>
    : <i className="fa fa-heart-o  is-size-5 is-clickable"  data-id={this.props.post_id} onClick={this.likesPost}></i>
    
    return(
<ul className='is-flex is-align-items-center is-flex-gap-lg'>
<li>{is_likes}</li>
<li><i class="fa fa-paper-plane-o has-text-dark is-size-5 is-clickable" aria-hidden="true"></i></li>
<li><i class="fa fa-comment-o has-text-dark is-size-5 is-clickable" aria-hidden="true"></i></li>
</ul>
    )
}

}

export default LikesCard;