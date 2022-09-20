
import React, { createRef, useRef } from 'react'
import banners from '../banner.jpg'
import akun from '../akun.jpg'
import { Link } from 'react-router-dom'
import ModalAddSkill from './modal-add-skill'
import {database} from '../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

function ProfileSidebar(props){


const banner =  {
  backgroundImage:`url(${banners})`
}

console.log(props);
// const skills = this.props.skills ==='' ? "" : this.props.skills.split(',');
  return(

<div className='p-0 box is-flex is-flex-direction-column is-flex-gap-lg'>
 <div className='profile-images is-flex is-flex-direction-column is-flex-gap-md'>
<div className='banner' style={banner}></div>
    <div className='profiles is-flex justify-between is-align-items-center mx-5'>
         <figure class="image is-64x64 avatar ">
         <img class="is-rounded border-md" src={props.dataUser.images === '' ? akun : props.dataUser.images } alt='' /> 
         </figure>
         <div className='username is-flex is-flex-column is-align-items-start is-flex-gap-sm'>
          <h4 className='subtitle is-6 has-text-weight-bold is-title p-0 m-0 '><Link to={`/profile/${props.id}`} className='has-text-dark'>{props.dataUser.fullname}</Link></h4>
          <h5 className='subtitle is-6 has-text-weight-normal p-0 m-0'>{props.dataUser.username}</h5>
         </div>
  </div>
       <ul className='is-flex is-align-items-center is-justify-content-space-around mx-5'>
       <li className='navbar-item is-flex is-flex-direction-column'>
         <span className='has-text-weight-bold has-text-dark is-title'>{props.dataUser.total_post}</span>
         <p className='subtitle has-text-dark is-size-6  p-2'>Post</p>
        </li>
        <li className='navbar-item is-flex is-flex-direction-column '>
         <span className='has-text-weight-bold has-text-dark is-title'>{props.dataUser.total_follower}</span>
      <p class="control mt-1">
       <span>Follower</span>
      </p>
        </li>
        <li className='navbar-item is-flex is-flex-direction-column '>
         <span className='has-text-weight-bold has-text-dark is-title'>{props.dataUser.total_following}</span>
         <p class="control mt-1">
         <span>Following</span>
      </p>
        </li>
         </ul>
         </div>
     {/* END PROFILES IMAGES */}

    </div>


        )

}

export default ProfileSidebar;

