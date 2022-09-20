import React from 'react'
import { Link } from 'react-router-dom'
import img from '../akun.jpg'

function SendMessageAvatar(props){

    return(
<header class="modal-card-head is-clickable has-background-white p-0 p-2 is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-md align-center'>
<figure class="image is-32x32 avatar">
<img src={props.dataUser.images === '' ? img : props.dataUser.images} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${props.dataUser.uid}`} className='has-text-dark'>{`this.state.username`}</Link></p>
</div>
</div>
{/* END MEDIA LEFT */}
</header>
    )
}

export default SendMessageAvatar;