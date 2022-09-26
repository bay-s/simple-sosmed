import React from 'react'
import akun from '../akun.jpg'

function ProfilePageAvatar(props){

    return(
  <div className='is-flex  align-center is-flex-gap-md avatar-container'>
            <figure class="image is-128x128 avatar">
                 <img
                   class="is-rounded"
                   src={props.data.images === '' ? akun : props.data.images }
                   alt=""
                 />
               </figure>
<div className='is-flex is-flex-column is-flex-gap-md avatars'>
 <h3 className="is-title is-size-4 is-bold">
 {props.data.username}
 </h3>
  <ul className='is-flex align-center is-flex-gap-xl justify-content-center'>
   <li className='is-flex is-flex-column align-center'>
   <p class="subtitle m-0 p-0 is-87 is-bold">{props.data.total_post}</p>
   <p class="pt-2 is-size-6 mb-1">Post</p>
   </li>
   <li className='is-flex is-flex-column align-center'>
   <p class="subtitle m-0 p-0 is-87 is-bold">{props.data.total_follower}</p>
    <button class="button is-small open-follower" onClick={props.openModal}>
      Follower
    </button>
   </li>
   <li className='is-flex is-flex-column align-center'>
   <p class="subtitle m-0 p-0 is-87 is-bold">{props.data.total_following}</p>
    <button class="button is-small open-following" onClick={props.openModal}>
      Following
    </button>
   </li>
  </ul>
</div>
        </div>
// END CONTAINER
    )
}

export default ProfilePageAvatar;