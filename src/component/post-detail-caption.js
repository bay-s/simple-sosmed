import React from 'react'
import { Link } from 'react-router-dom'
import img from '../akun.jpg'

function PostDetailCaption(props){

    return(
<div className='media-left is-flex is-flex-gap-md align-center p-2'>
<figure class="image is-32x32 avatar">
<img src={props.data.images === '' ? img : props.data.images} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${props.post_id}`} className='has-text-dark'>{this.state.username}</Link></p>
</div>
<span className='is-7 p-0'>{props.post_caption}</span>
</div>
    )
}

export default PostDetailCaption;