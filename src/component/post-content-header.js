import React from 'react'
import { Link } from 'react-router-dom'
import img from '../akun.jpg'

function PostContentHeader(props){

    return(
        <div class="media is-align-items-center my-2 m-0">
        <div class="media-left p-2">
        <figure class="image is-32x32 avatar">
        <img src={props.getAvatar.length < 1 ? img : props.getAvatar} className='is-rounded' alt="Placeholder image" />
        </figure>
        </div>
        <div class="p-0 ">
        <p class="subtitle is-6 is-title p-0 mb-1"><Link to={`/profile/${props.post.user_id}`} className='has-text-dark'>{props.post.username}</Link></p>
        <time>{props.date}</time>
        </div>
        </div>
    )
}

export default PostContentHeader;