import React from 'react'
import { Link, useParams } from 'react-router-dom';
import {database} from '../firebase';
import { collection, getDocs,query, where,doc,updateDoc,addDoc,arrayUnion,serverTimestamp, arrayRemove} from 'firebase/firestore';
import NoCommentYet from './no-commeny-yet';
import img from '../akun.jpg'
import LikesCard from './likes_card';
import DisplayComment from './display-comment';
import PostComment from './comment-input-card';



function ModalPostDetail(props){


    const comment = <DisplayComment key={props.id} post_id={props.post_id} user_id={props.user_id} avatar={props.avatar} user_name={props.name} />
    return(

  <div class="modal-card">
    <section class="modal-card-body columns p-0">
{/* START COL LEFT */}
<div className='column is-8 p-0 m-0'>
<figure class="h-100 image is-4by3">
<img src={props.post_img} alt="Placeholder image" />
</figure>
</div>
{/* end col left */}
<div className='column is-4 p-0 m-0 h-100  is-flex is-flex-column justify-between'>
 <header class="modal-card-head has-background-white py-2 is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-md align-center mt-2'>
<figure class="image is-32x32">
<img src={props.avatar === '' ? img : props.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><a href="#0" className='has-text-dark'>{props.name}</a></p>
</div>
</div>
{/* END MEDIA LEFT */}

<div className={props.id === props.user_id ? 'media-right px-3 mt-2' : 'hide'}>
<i className="fa fa-trash has-text-danger is-size-5 is-clickable" aria-hidden="true" onClick={props.modalDelete}></i>
</div>
</header>
<div className='media-left is-flex is-flex-gap-md align-center p-2'>
<figure class="image is-32x32 avatar">
<img src={props.avatar === '' ? img : props.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0">
<p class="subtitle is-7 is-title p-0"><a href="#0" className='has-text-dark'>{props.name}</a></p>
</div>
<span className='is-7 p-0'>{props.post_caption}</span>
</div>
{/* END CAPTION */}
{/* START COMMENT CONTENT */}
<div className='is-flex is-flex-column is-flex-gap-md p-2 my-auto is-flex-grow-1 comment-container'>
{props.total_comment > 0 ? comment : <NoCommentYet />} 
</div>
{/* ENDCOMMENT CONTENT */}
{/* START COMMENT*/}
<div className='is-flex is-flex-column'>
<div className='p-3 is-flex is-flex-column border-sm'>
{<LikesCard id={props.user_id} avatar={props.avatar} name={props.name} post_id={props.post_id} />}
<div className='mt-2'>
<p className='subtitle is-7 p-0 m-0 is-title is-bold'>
{props.total_likes > 0 ? `${props.total_likes} Like` : 'Be the first to'}
</p> 
<time className='subtitle is-7 p-0 m-0 is-title is-bold'>12 august 2022</time>
</div>
</div>
{/* START COMMENT INPUT */}
<PostComment post_id={props.post_id} total_comment={props.total_comment} user_id={props.user_id} name={props.name} avatar={props.avatar}/>
{/* END COMMENT */}
</div>
{/* END COMMENT */}
            </div>
    </section>
  </div>

    )

}

export default ModalPostDetail;


// <form class="field is-grouped  is-align-items-center border-sm" onSubmit={this.postComment}>
// <div class="column is-9 p-0 control ">
// <input class="input no-border" type="text" name='comment' placeholder="Text input" onChange={this.handlerChange}/>
// </div>
// <div class="column is-3 p-0 control">
// {this.state.hide ? <button type='submit' class="button is-medium is-link is-light pe-5" disabled>Post</button> : <button type='submit' class="button is-medium is-link is-light pe-5">Post</button>}
// </div>
// </form>




