import React from 'react'
import img from '../akun.jpg'
import { Link } from 'react-router-dom'
import {database} from '../firebase';
import { doc, deleteDoc,collection, getDocs,query, where} from 'firebase/firestore';


class UserPostCard extends React.Component{
constructor(){
    super()
    this.state = {
    getAvatar:[],
    modalDelete:true,
    month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
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
    const id = e.target.dataset.id
    const user =  doc(database,'user',this.props.id )
    const docDelete = doc(database,'post',id )
    const docUpdate = doc(database,'user',this.props.id) 

      if(confirm("Are you sure want to delete this post")){
updateDoc(user,{total_post:this.state.total_post - 1})
deleteDoc( docDelete)
.then(() =>{
alert("delete sukses")
})
.catch(err => {
console.log(err.message);
})
      }else{
  
      }
    }

    
    openModal = e  => {
        e.preventDefault()
this.setState({modalDelete:!this.state.modalDelete})
    }

render(){
const  timestamp = this.props.data.timestamp.seconds
const time = new Date(timestamp*1000)
const date = `${time.getDate()} ${this.state.month[time.getMonth()]} ${time.getFullYear()}`

    return(
        <>
<div className='column is-6'>
<div class="card posts-card">
<div class="media is-align-items-center my-2 m-0 is-justify-content-space-between mx-3">
<div class="media-left p-2 is-flex is-flex-gap-md is-align-items-center">
<figure class="image is-32x32">
<img src={img} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-6 is-title p-0 mb-1"><Link to={`/profile/${this.props.data.user_id}`} className='has-text-dark'>@{this.props.data.username}</Link></p>
<time>{date}</time>
</div>
</div>
<a href='#0' className='has-text-danger has-text-weight-bold is-size-5'><i class="fa fa-trash" aria-hidden="true" onClick={this.openModal}></i></a>
</div>
<div class="card-image">
<figure class="image is-4by3">
<Link to={`/profile/${this.props.data.user_id}`}>
<img src={this.props.data.post_image} alt="Placeholder image" />
</Link>
</figure>
</div>
<div class="card-content p-2 ">
<ul className='is-flex is-align-items-center is-flex-gap-lg'>
<li><a href='#'><i class="fa fa-heart-o has-text-dark is-size-4" aria-hidden="true"></i></a></li>
<li><a href='#'><i class="fa fa-paper-plane-o has-text-dark is-size-4" aria-hidden="true"></i></a></li>
<li><a href='#'><i class="fa fa-comment-o has-text-dark is-size-4" aria-hidden="true"></i></a></li>
</ul>
<div class="content my-2 is-flex is-flex-direction-column is-flex-gap-sm">
<div className='is-flex is-flex-gap-sm is-align-items-center'><Link to={`/profile-page/${this.props.data.user_id}`} className='subtitle is-6 is-title p-0 m-0'>{this.props.data.username}</Link> : <p className='p-0'>{this.props.data.post_caption}</p></div>
<a href="#">#{this.props.data.post_caption}</a>
</div>
</div>
{/* END CARD-CONTENT */}
</div>
</div>


<div className={this.state.modalDelete ? 'modal' : 'modal is-active'}>
  <div class="modal-background"></div>

  <div class="modal-content delete-modal">
    <div class="field is-grouped box is-flex is-justify-content-center">
  <p class="control">
    <button class="button is-danger">
      Delete post
    </button>
  </p>
  <p class="control">
    <button class="button is-link">
      Cancel
    </button>
  </p>
</div>
  </div>

  <button class="modal-close is-large" aria-label="close" onClick={this.openModal }></button>
</div>
</>
    )
}

}

export default UserPostCard;



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