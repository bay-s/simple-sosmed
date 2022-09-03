import React from 'react'
import FollowingCard from './following-card';


function ModalFollowing(props){

  const followCard = props.following != null ? props.following.map(data => {
    return <FollowingCard follow_id={data} id={props.id }/>
   }) : ""
    return(
<div class="card w-25">
    <header class="modal-card-head p-2 py-3">
      <p class="modal-card-title is-size-6 text-center">Following</p>
      <button class="delete" aria-label="close" closeModal={props.closeModal}></button>
    </header>
    <section class="modal-card-body is-flex is-flex-column is-flex-gap-md ">
{followCard}
    </section>
</div>

    )
}

export default ModalFollowing;

