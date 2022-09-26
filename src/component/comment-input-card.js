import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import {database,auth} from '../firebase';
import { collection,arrayUnion, getDocs,updateDoc,setDoc,serverTimestamp,query, where,doc, deleteDoc,getDocFromCache} from 'firebase/firestore';


class PostComment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user_id:'',
            loading:true,
            hide:false,
            total:null,
            total_comment:this.props.total_comment,
            username:'',
            avatar:'',
            comment:''
        }
    }

       
handlerChange = (e) => {
    const {name,value} = e.target
    this.setState({[name]:value})
    if(value.length > 0){
        this.setState({hide:this.state.hide = true})
    }else{
        this.setState({hide:this.state.hide = false})
    }
  }
  

  commentNotif = (ranID) => {
    const notif_id =  this.props.user_id
  
    const docUpdate = doc(database,'notifikasi',notif_id ) // ADD NOTIF
    const time = serverTimestamp()
  
    updateDoc(docUpdate,{
                notif:arrayUnion({
                    pesan:`${this.props.dataUser.username} Telah mengomentari postingan anda`,
                    user_name:this.props.dataUser.username,
                    user_id:this.props.user_id,
                    user_avatar:this.props.dataUser.images,
                    post_id:this.props.post_id,
                  })
          })
    .then(() => {console.log("notif me senpai")})
    .catch((err) => {console.log(err)}); 
  
  }
  
  createReply = () => {
    const db = collection(database,'reply');
    const user_id = this.props.post_id
    setDoc(doc(db,user_id ),  {
         original_reply:[],
         user_reply:[],
         comment_id:this.props.post_id
      })
      .then(() => {console.log("notif sukses")})  
      .catch((err) => {
        console.log(err);
      })
  }
  
  postComment = (e) => {
    e.preventDefault()
    const ranID = (Math.random() + 1).toString(36).substring(1);
    const db = collection(database,"comment")
    const id = this.props.user_id
    const post_id = this.props.post_id
    const docUpdate = doc(database,"post",post_id)
  if (this.state.comment.length < 2) {
  alert("Too short")

  }else{
    this.setState({hide:this.state.hide = false})
    // this.createReply()
    // this.commentNotif(ranID)
    console.log(post_id );
    updateDoc(docUpdate,{
        total_comment:this.state.total_comment + 1
      })
      setDoc(doc(db,ranID),  {
        comment_id:ranID,
        post_id: post_id,
        post_owner_id:this.props.user_id,
        comment_text:this.state.comment,
        comment_author_name:this.props.dataUser.username,
        user_avatar:this.props.dataUser.images,
        timestamp: serverTimestamp(),
        reply:[]
        })
        .then(() =>{
        alert("comment posted")
        this.setState({hide:this.state.hide = true})
        e.target.reset()
        })
        .catch(err => {alert(err.message)})
  }
  }
  
  
  render(){

    return(
<form class="field has-addons" onSubmit={this.postComment}>
    <input class="input no-radius" type="text" name='comment' placeholder="Write something" onChange={this.handlerChange}/>
{this.state.hide ? <button type='submit' class="button is-info no-radius">
      Post
   </button> : <button class="button is-info no-radius" disabled>
      Post
    </button>}
</form>
    )
  }
}

export default PostComment;



{/* <form class="field has-addons" onSubmit={this.postComment}>
  <div class="control w-100">
    <input class="input no-radius" type="text" name='comment' placeholder="Write something" onChange={this.handlerChange}/>
  </div>
  <div class="control">
{this.state.hide ? <button type='submit' class="button is-info no-radius">
      Post
   </button> : <button class="button is-info no-radius" disabled>
      Post
    </button>}
  </div>
</form> */}