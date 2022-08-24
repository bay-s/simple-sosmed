import React from 'react'
import { Link } from 'react-router-dom';
import img from '../akun.jpg'

class PostContent extends React.Component{
constructor(){
  super()
  this.state = {
    month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
  }
}

render(){

  return(
    this.props. dataPost.length < 1 ? "" : this.props.dataPost.docs.map(item => {
    const post = item.data()
    const  timestamp = post.timestamp.seconds
    const time = new Date(timestamp*1000)
    const date = `${time.getDate()} ${this.state.month[time.getMonth()]} ${time.getFullYear()}`
    
    return  <div className='column is-12'>
    <div class="card posts-card">
<div class="media is-align-items-center my-2 m-0">
<div class="media-left p-2">
<figure class="image is-32x32">
<img src={img} className='is-rounded' alt="Placeholder image" />
</figure>
</div>
<div class="p-0 ">
<p class="subtitle is-6 is-title p-0 mb-1"><Link to={`/profile/${post.user_id}`} className='has-text-dark'>@{post.username}</Link></p>
<time>{date}</time>
</div>
</div>
<div class="card-image">
<figure class="image is-4by3">
<Link to={`/profile/${post.user_id}`}>
<img src={post.post_image} alt="Placeholder image" />
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
<div className='is-flex is-flex-gap-sm is-align-items-center'><Link to={`/profile-page/${post.user_id}`} className='subtitle is-6 is-title p-0 m-0'>{post.username}</Link> : <p className='p-0'>{post.post_caption}</p></div>
<a href="#">#{post.post_caption}</a>
</div>
</div>
{/* END CARD-CONTENT */}
<div class="field is-grouped my-1 is-align-items-center box-comment">
  <p class="control is-expanded p-0 m-0 comment-btn">
    <input class="input" type="text" placeholder="Add a comment" />
  </p>
  <div class="p-0 m-0 comment-btn">
    <a class="is-info is-title is-size-7 mx-2 has-text-weight-bold" >
      Post
    </a>
  </div>
</div>
{/* END FIELDS */}
</div>
</div>
    })

       )
}
}

export default PostContent;