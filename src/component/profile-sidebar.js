import React from 'react'
import banners from '../banner.jpg'
import akun from '../akun.jpg'
import { Link } from 'react-router-dom'
function ProfileSidebar(props){


            // is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd
const banner =  {
    backgroundImage:`url(${banners})`
  }

    return(
<div className='p-0 box is-flex is-flex-direction-column is-flex-gap-lg'>
        <div className='profile-images is-flex is-flex-direction-column is-flex-gap-md'>
                      <div className='banner' style={banner}></div>
                       <div className='profiles is-flex is-justify-content-space-between is-align-items-center mx-3'>
     <figure class="image is-64x64 avatar ">
     <img class="is-rounded border-md" src={props.avatar === '' ? akun : props.avatar} alt='' /> 
     </figure>
     <div className='username is-flex is-flex-column is-align-items-start is-flex-gap-sm'>
      <h4 className='subtitle is-6 has-text-weight-bold is-title p-0 m-0 '><Link to={`/profile/${props.id}`} className='has-text-dark'>{props.fullname}</Link></h4>
      <h5 className='subtitle is-6 has-text-weight-normal p-0 m-0'>@{props.name}</h5>
     </div>
                           </div>
   <ul className='is-flex is-align-items-center is-justify-content-space-around mx-5'>
   <li className='navbar-item is-flex is-flex-direction-column'>
     <span className='has-text-weight-bold has-text-dark is-title'>{props.total_post}</span>
     <p className='subtitle has-text-dark is-size-6  p-2'>Post</p>
    </li>
    <li className='navbar-item is-flex is-flex-direction-column '>
     <span className='has-text-weight-bold has-text-dark is-title'>{props.total_follow}</span>
  <p class="control mt-1">
    <button class="button is-small">
      <span>Follower</span>
    </button>
  </p>
    </li>
    <li className='navbar-item is-flex is-flex-direction-column '>
     <span className='has-text-weight-bold has-text-dark is-title'>{props.total_following}</span>
     <p class="control mt-1">
    <button class="button is-small">
      <span>Following</span>
    </button>
  </p>
    </li>
     </ul>
                         </div>
                         {/* END PROFILES IMAGES */}
</div>
    )
}

export default ProfileSidebar;