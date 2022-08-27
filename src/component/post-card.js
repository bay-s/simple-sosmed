import React from 'react'
import img from '../akun.jpg'
import { Link } from 'react-router-dom'
import {database} from '../firebase';
import { doc, deleteDoc,collection, getDocs,query, where, updateDoc} from 'firebase/firestore';
import ModalPostDetail from './modal-detail';
import ModalDelete from './delete-modal';


class PostCard extends React.Component{
constructor(){
    super()
    this.state = {
    getAvatar:[],
    modalDelete:true,
    modalPost:true,
    month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
    post_detail_id:''
    }
}

async componentDidMount(){
    const db = collection(database,"user")
    const id = this.props.data.user_id

    const q = query(db ,where("uid","==" , id))

  // GET AVATAR
  await getDocs(q).then(res => {
    res.docs.map(item => {
    const data = item.data()
return this.setState({getAvatar:this.state.getAvatar = data.images})
      });
    })

}


deletePost = (e) => {
    e.preventDefault()
    const id = e.target.dataset.post_id
    const user =  doc(database,'user',this.props.id )
    const docDelete = doc(database,'post',id )
    const docUpdate = doc(database,'user',this.props.id) 

updateDoc(user,{total_post:this.state.total_post - 1})
deleteDoc( docDelete)
.then(() =>{
alert("delete sukses")
this.setState({modalDelete:!this.state.modalDelete})
})
.catch(err => {
console.log(err.message);
})
     
    }


openModalPost = e  => {
 e.preventDefault()
 const data_id = e.target.dataset.id
this.setState({
    modalPost:!this.state.modalPost,
    post_detail_id:data_id
})

    }
openModalDelete = e  => {
      e.preventDefault()
this.setState({modalDelete:!this.state.modalDelete})
  }
render(){

const  timestamp = this.props.data.timestamp !== null ? this.props.data.timestamp.seconds : ""
const time = new Date(timestamp*1000)
const date = `${time.getDate()} ${this.state.month[time.getMonth()]} ${time.getFullYear()}`

    return(
<>      
<div className='column is-4'>
<div class="card posts-card">
<div class="card-image is-relative profile-post">
<figure class="image is-4by3">
<Link to={`/post/${this.props.data.post_id}`}>
<img src={this.props.data.post_image} alt="Placeholder image"  data-id={this.props.data.post_id} onClick={this.openModalPost}/>
</Link>
</figure>
<div className='comments'>
<a href='#'><i class="fa fa-comment has-text-white is-size-4" aria-hidden="true"></i></a>
</div>
</div> 
{/* END CARD IMAGE */}
</div>
</div>



<div className={this.state.modalPost ? 'modal' : 'modal is-active modal-post'}>
 <div class="modal-background"></div>
<ModalPostDetail id={this.props.id} post_img={this.props.data.post_image} modalDelete={this.openModalDelete } user_id={this.props.data.user_id} user_name={this.props.data.username} avatar={this.props.avatar} post_id={this.state.post_detail_id}/>
 <button class="modal-close is-large" aria-label="close" onClick={this.openModalPost}></button>
 </div>


 <div className={this.state.modalDelete ? 'modal' : 'modal is-active'}>
 <div class="modal-background"></div>
<ModalDelete post_id={this.props.data.post_id} modalDelete={this.openModalDelete } deletePost={this.deletePost} />
 <button class="modal-close is-large" aria-label="close" onClick={this.openModalDelete }></button>
 </div>
</>
    )
}

}

export default PostCard;

{/* <div class="card-image is-relative">
<figure class="image is-4by3" onClick={this.openModal}>
<Link to={`/post/${this.props.data.post_id}`}>
<img src={this.props.data.post_image} alt="Placeholder image" />
</Link>
</figure>
<div className='comments'>
<a href='#'><i class="fa fa-comment has-text-white is-size-4" aria-hidden="true"></i></a>
</div>
</div> 


// <div class="card posts-card">
// <div class="card-image is-relative">
// <figure class="image is-4by3" onClick={this.openModalPost}>
// <a href='#'>
// <img src='https://bulma.io/images/placeholders/1280x960.png' alt="Placeholder image" />
// </a>
// </figure>
// <div className='comments'>
// <a href='#'><i class="fa fa-comment has-text-white is-size-4" aria-hidden="true"></i></a>
// </div>
// </div>
// {/* END CARD IMAGE */}

// </div>


{/* <a href='#0' className='has-text-danger has-text-weight-bold is-size-5'><i class="fa fa-trash" aria-hidden="true" onClick={this.openModal}></i></a> */}
// <div className='column is-12'>
//     <div class="card posts-card">
// <div class="media is-align-items-center my-2 m-0">
// <div class="media-left p-2">
// <figure class="image is-32x32">
// <img src={img} className='is-rounded' alt="Placeholder image" />
// </figure>
// </div>
// <div class="p-0 ">
// <p class="subtitle is-6 is-title p-0 mb-1"><Link to={`/profile/${post.user_id}`} className='has-text-dark'>@{post.username}</Link></p>
// <time>{date}</time>
// </div>
// </div>
// <div class="card-image">
// <figure class="image is-4by3">
// <Link to={`/profile/${post.user_id}`}>
// <img src={post.post_image} alt="Placeholder image" />
// </Link>
// </figure>
// </div>
// <div class="card-content p-2 ">
// <ul className='is-flex is-align-items-center is-flex-gap-lg'>
// <li><a href='#'><i class="fa fa-heart-o has-text-dark is-size-4" aria-hidden="true"></i></a></li>
// <li><a href='#'><i class="fa fa-paper-plane-o has-text-dark is-size-4" aria-hidden="true"></i></a></li>
// <li><a href='#'><i class="fa fa-comment-o has-text-dark is-size-4" aria-hidden="true"></i></a></li>
// </ul>
// <div class="content my-2 is-flex is-flex-direction-column is-flex-gap-sm">
// <div className='is-flex is-flex-gap-sm is-align-items-center'><Link to={`/profile-page/${post.user_id}`} className='subtitle is-6 is-title p-0 m-0'>{post.username}</Link> : <p className='p-0'>{post.post_caption}</p></div>
// <a href="#">#{post.post_caption}</a>
// </div>
// </div>
// {/* END CARD-CONTENT */}
// <div class="field is-grouped my-1 is-align-items-center box-comment">
//   <p class="control is-expanded p-0 m-0 comment-btn">
//     <input class="input" type="text" placeholder="Add a comment" />
//   </p>
//   <div class="p-0 m-0 comment-btn">
//     <a class="is-info is-title is-size-7 mx-2 has-text-weight-bold" >
//       Post
//     </a>
//   </div>
// </div>
// {/* END FIELDS */}
// </div>
// </div>