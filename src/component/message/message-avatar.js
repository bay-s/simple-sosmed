import React from 'react'
import { Link } from 'react-router-dom'
import img from '../akun.jpg'

function MessageAvatar(props){

    return(

<header class="p-0 p-2 is-flex align-center justify-between w-100" data-id={props.msg.message_id} onClick={props.openTab}>
<div className='media-left is-flex is-flex-gap-md align-center'>
<figure class="image is-32x32 avatar">
<img src={props.msg.sender_avatar === '' ? img : props.msg.sender_avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1">{props.msg.sender_name}</p>
</div>
</div>
{/* END MEDIA LEFT */}
</header>
    )
}

export default MessageAvatar;

{/* <p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${props.msg.sender_id}`} className='has-text-dark'>{props.msg.sender_name}</Link></p> */}