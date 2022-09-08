import React from 'react'
import { Link, useParams } from 'react-router-dom';
import {database} from '../firebase';
import { collection, getDocs,query, where,doc,updateDoc,addDoc,arrayUnion,serverTimestamp, arrayRemove} from 'firebase/firestore';
import NoCommentYet from './no-commeny-yet';
import img from '../akun.jpg'
import LikesCard from './likes_card';
import DisplayComment from './display-comment';
import PostComment from './comment-input-card';



class ModalPostDetail extends React.Component{
constructor(){
  super()
  this.state = {
    hide:false,
    comment:'',
    user_post_id:'',
    total_comments:null,
  }
}


// handlerChange = (e) => {
//   const {name,value} = e.target
//   this.setState({[name]:value})
//   if(value.length > 0){
//       this.setState({hide:this.state.hide = true})
//   }else{
//       this.setState({hide:this.state.hide = false})
//   }
// }


// commentNotif = (ranID) => {
//   const notif_id =  this.props.user_id

//   const docUpdate = doc(database,'notifikasi',notif_id ) // ADD NOTIF
//   const time = serverTimestamp()

//   updateDoc(docUpdate,{
//               notif:arrayUnion({
//                   pesan:`${this.props.name} Telah mengomentari postingan anda`,
//                   user_name:this.props.name,
//                   user_id:this.props.user_id,
//                   user_avatar:this.props.avatar,
//                   post_id:this.props.id,
//                 })
//         })
//   .then(() => {console.log("notif me senpai")})
//   .catch((err) => {console.log(err)}); 

// }

// createReply = () => {
//   const db = collection(database,'reply');
//   const user_id = this.props.id
//   setDoc(doc(db,user_id ),  {
//        original_reply:[],
//        user_reply:[],
//        comment_id:this.props.id
//     })
//     .then(() => {console.log("notif sukses")})  
//     .catch((err) => {
//       console.log(err);
//     })
// }

// postComment = (e) => {
//   e.preventDefault()
//   const ranID = (Math.random() + 1).toString(36).substring(1);
//   const db = collection(database,"comment")
//   const id = this.props.user_id
//   const post_id = this.props.id
//   const docUpdate =doc(database,"post",post_id)
// if (this.state.comment.length < 2) {
// alert("Too short")
// }else{
//   this.setState({hide:this.state.hide = false})
//   // this.createReply()
//   // this.commentNotif(ranID)
//   updateDoc(docUpdate,{
//       total_comment: + 1
//     })
//     setDoc(doc(db,ranID),  {
//       comment_id:ranID,
//       comment_author_id:id,
//       post_id: post_id,
//       post_owner_id:this.props.user_id,
//       comment_text:this.state.comment,
//       comment_author_name:this.props.name,
//       user_avatar:this.props.avatar,
//       timestamp: serverTimestamp(),
//       reply:[]
//       })
//       .then(() =>{
//       alert("comment posted")
//       this.setState({hide:this.state.hide = true})
//       e.target.reset()
//       })
//       .catch(err => {alert(err.message)})
// }
// }


  render(){

    const comment = <DisplayComment key={this.props.id} post_id={this.props.post_id} user_id={this.props.user_id} avatar={this.props.avatar} user_name={this.props.name} />
    return(
      <div className='container m-5 w-100 has-background-white'>
        <div className='columns is-multiline p-0 m-0 h-100'>
 <div className='column is-8 p-0 m-0 h-100'>
<figure class="h-100 image is-4by3">
<img src={this.props.post_img} alt="Placeholder image" />
</figure>
            </div>
  <div className='column is-4 p-0 m-0 h-100  is-flex is-flex-column justify-between'>
 <header class="modal-card-head has-background-white py-2 is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-md align-center mt-2'>
<figure class="image is-32x32">
<img src={this.props.avatar === '' ? img : this.props.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><a href="#0" className='has-text-dark'>{this.props.user_name}</a></p>
</div>
</div>
{/* END MEDIA LEFT */}

<div className={this.props.id === this.props.user_id ? 'media-right px-3 mt-2' : 'hide'}>
<i className="fa fa-trash has-text-danger is-size-5 is-clickable" aria-hidden="true" onClick={this.props.modalDelete}></i>
</div>
</header>
<div className='media-left is-flex is-flex-gap-md align-center p-2'>
<figure class="image is-32x32 avatar">
<img src={this.props.avatar === '' ? img : this.props.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0">
<p class="subtitle is-7 is-title p-0"><a href="#0" className='has-text-dark'>{this.props.user_name}</a></p>
</div>
<span className='is-7 p-0'>{this.props.post_caption}</span>
</div>
{/* END CAPTION */}
{/* START COMMENT CONTENT */}
<div className='is-flex is-flex-column is-flex-gap-md p-0 my-auto is-flex-grow-1'>
{this.props.total_comment > 0 ? comment : <NoCommentYet />}
</div>
{/* ENDCOMMENT CONTENT */}
{/* START COMMENT*/}
<div className='is-flex is-flex-column'>
<div className='p-3 is-flex is-flex-column border-sm'>
{<LikesCard id={this.props.user_id} avatar={this.props.avatar} name={this.props.name} post_id={this.props.post_id} />}
<div className='mt-2'>
<p className='subtitle is-7 p-0 m-0 is-title is-bold'>
{this.props.total_likes > 0 ? `${this.props.total_likes} Like` : 'Be the first to'}
</p> 
<time className='subtitle is-7 p-0 m-0 is-title is-bold'>12 august 2022</time>
</div>
</div>
{/* START COMMENT INPUT */}
<PostComment post_id={this.props.post_id} user_id={this.props.user_id} name={this.props.name} avatar={this.props.avatar}/>
{/* END COMMENT */}
</div>
{/* END COMMENT */}
            </div>
        </div>
      </div>
    )
  }
}

export default ModalPostDetail;


// <form class="field is-grouped  is-align-items-center border-sm" onSubmit={this.postComment}>
// <div class="column is-9 p-0 control ">
// <input class="input no-border" type="text" name='comment' placeholder="Text input" onChange={this.handlerChange}/>
// </div>
// <div class="column is-3 p-0 control">
// {this.state.hide ? <button type='submit' class="button is-medium is-link is-light pe-5" disabled>Post</button> : <button type='submit' class="button is-medium is-link is-light pe-5">Post</button>}
// </div>
// </form>




