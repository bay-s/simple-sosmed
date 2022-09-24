import React from 'react'
import { Link } from 'react-router-dom';
import img from '../akun.jpg'


function PostDetailHeader(props){

    return(
<header class="modal-card-head has-background-white p-0 p-2 is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-md align-center'>
<figure class="image is-32x32 avatar">
<img src={props.data.images === '' ? img : props.data.images} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${props.post.user_id}`} className='has-text-dark'>{props.post.username}</Link></p>
</div>
</div>
{/* END MEDIA LEFT */}
<div className={props.id === props.post.user_id ? 'media-right px-3 mt-2' : 'hide'}>
<i className="fa fa-trash has-text-danger is-size-5 is-clickable" aria-hidden="true" onClick={``}></i>
</div>
</header>
    )
}


export default PostDetailHeader;