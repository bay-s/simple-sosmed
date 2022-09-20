import React from 'react'
import FollowerCard from './follower-card';


function ModalFollower(props){
  const followCard = props.follower != null ? props.follower.map(data => {
    return <FollowerCard follow_id={data} id={props.id} />
   }) : ""
    return(
<div class="card w-25">
<header class="modal-card-head p-2 py-3">
      <p class="modal-card-title is-size-6 text-center">Follower</p>
      <button class="delete" aria-label="close" closeModal={props.closeModal}></button>
    </header>
    <section class="modal-card-body is-flex is-flex-column is-flex-gap-md justify-content-center ">
{followCard}
    </section>
  </div>

    )
}

export default ModalFollower;