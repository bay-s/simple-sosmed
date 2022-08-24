import React from 'react'
import banners from '../banner.jpg'
import akun from '../akun.jpg'
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
     <figure class="image image is-64x64">
     <img class="is-rounded" src={props.avatar === '' ? akun : props.avatar} alt='' /> 
     </figure>
     <div className='username is-flex is-flex-direction-column is-align-items-start is-flex-gap-sm'>
      <h4 className='is-size-5 has-text-weight-bold is-title'>{props.fullname}</h4>
      <h5 className='is-size-6 has-text-weight-normal '>@{props.name}</h5>
     </div>
                           </div>
   <ul className='is-flex is-align-items-center is-justify-content-space-around mx-5'>
   <li className='navbar-item is-flex is-flex-direction-column'>
     <span className='has-text-weight-bold has-text-dark is-title'>{props.total_post}</span>
     <a className='has-text-dark is-size-6'>Post</a>
    </li>
    <li className='navbar-item is-flex is-flex-direction-column '>
     <span className='has-text-weight-bold has-text-dark is-title'>{props.total_follow}</span>
     <a className='has-text-dark is-size-6'>Follower</a>
    </li>
    <li className='navbar-item is-flex is-flex-direction-column '>
     <span className='has-text-weight-bold has-text-dark is-title'>{props.total_following}</span>
     <a className='has-text-dark is-size-7'>Following</a>
    </li>
     </ul>
                         </div>
                         {/* END PROFILES IMAGES */}
</div>
    )
}

export default ProfileSidebar;