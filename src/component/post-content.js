import React from 'react'
import {database} from '../firebase';
import { Link } from 'react-router-dom'
import { collection, deleteDoc,getDocs,query, where,doc,updateDoc,addDoc,arrayUnion,serverTimestamp, arrayRemove} from 'firebase/firestore';
import LikesCard from './likes_card';
import PostComment from './comment-input-card';
import ModalPostDetail from './modal-detail';
import PostContentHeader from './post-content-header';
import ModalConfirm from './modal-confirm';

class PostContent extends React.Component{
constructor(){
  super()
  this.state = {
  getAvatar:[],
  month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
  uniqId:'',
  token:'',
  post_detail_id:'',
  modalPost:true,
  modalDelete:false
  }
}


async componentDidMount(){
  const db = collection(database,"user")
  const id = this.props.post.user_id
  const q = query(db ,where("uid","==" , id))

// GET AVATAR
await getDocs(q).then(res => {
  res.docs.map(item => {
  const data = item.data()
return this.setState({getAvatar:data.images})
    });
  })

}

async componentDidUpdate(){
  const db = collection(database,"user")
  const id = this.props.post.user_id
  const q = query(db ,where("uid","==" , id))

// GET AVATAR
// await getDocs(q).then(res => {
//   res.docs.map(item => {
//   const data = item.data()
// return this.setState({getAvatar:this.state.getAvatar = data.images})
//     });
//   })


}



openModalPost = e  => {
  e.preventDefault()
  const data_id = e.target.dataset.id
  this.setState({post_detail_id:data_id})
  if(e.target.classList.contains('open-post')){
    console.log("test");
    this.setState({modalPost:!this.state.modalPost})
  }if(e.target.classList.contains('open-delete')){
    this.setState({modalDelete:!this.state.modalDelete})
  }
}

deletePost = (e) => {
  e.preventDefault()
  const id = e.target.dataset.id
  const user =  doc(database,'user',this.props.id )
  const docDelete = doc(database,'post',id )

updateDoc(user,
  {total_post:this.state.total_post - 1})
   deleteDoc( docDelete) 
   .then(() =>{ alert("delete sukses") 
   this.setState({modalDelete:!this.state.modalDelete}) }) 
   .catch(err => { console.log(err.message)})    
  }

  
  closeModal = e  => {
    e.preventDefault()
    this.setState({
      modalPost:false,
      modalDelete:false
    })
  }
render() {
  
  const  timestamp = this.props.post.timestamp !== null ? this.props.post.timestamp.seconds : ""
  const time = new Date(timestamp*1000)
  const date = `${time.getDate()} ${this.state.month[time.getMonth()]} ${time.getFullYear()}`
  return(
    <>
    <div className='column is-12'>
       <div class="card posts-card">
<PostContentHeader date={date} getAvatar={this.state.getAvatar} post={this.props.post}/>
   <div class="card-image">
   <figure class="image is-4by3">
   <Link to={`/post/${this.props.post.post_id}`}>
   <img src={this.props.post.post_image} alt="Placeholder image "  className='open-post' onClick={this.openModalPost}/>
   </Link>
   </figure>
   </div>
   
   <div class="card-content p-2 ">
   {<LikesCard avatar={this.props.dataUser.images} name={this.props.dataUser.username} id={ this.props.id} post_id={this.props.post.post_id} />}
   
   <div class="my-2 is-flex is-flex-direction-column is-flex-gap-sm">
   <div className='is-flex is-flex-gap-sm is-align-items-center'>
   <Link to={`/profile/${this.props.post.user_id}`} className='is-size-7 has-text-dark has-text-weight-semibold is-title p-0 m-0'>{this.props.post.username}</Link> : <p className='p-0 is-size-7 has-text-weight-semibold'>{this.props.post.post_caption}</p>
   </div>
   <a href="#">#{this.props.post.post_caption}</a>
   <p className='mt-2 has-text-weight-semibold has-text-grey is-clickable is-size-7 open-post' onClick={this.openModalPost}>{this.props.post.total_comment > 0 ? `View all ${this.props.post.total_comment} comments` : "" }</p>
   </div>
   </div>
   {/* END CARD-CONTENT */}
   <PostComment post_id={this.props.post.post_id} total_comment={this.props.post.total_comment} user_id={this.props.post.user_id} name={this.props.post.username} avatar={this.state.getAvatar}/>
   {/* END FIELDS */}
   </div>
   </div>
   

<div className={this.state.modalPost ? 'modal' : 'modal is-active modal-post'}>
 <div class="modal-background"></div>
<ModalPostDetail id={this.props.id} post={this.props.post} avatar={this.state.getAvatar} openModalPost={this.openModalPost} dataUser={this.props.dataUser}/>
 <button class="modal-close is-large open-post" aria-label="close" onClick={this.openModalPost}></button>
 </div>

{/* MODAL DELETE */}
<div className={this.state.modalDelete ? 'modal is-active' : 'modal'}>
 <div class="modal-background"></div>
 <ModalConfirm modalDelete={this.closeModal} id={this.props.post.post_id} deleteAccount={this.deletePost}/>
 <button class="modal-close is-large close-delete" aria-label="close" onClick={this.closeModal }></button>
 </div>
   </>
          )
}

}

export default PostContent;

