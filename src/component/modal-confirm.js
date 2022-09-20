import React from 'react'

function ModalConfirm(props){

    return(
<div class="modal-content w-25 ">
<form class="field is-grouped box is-flex is-flex-direction-column is-align-items-center has-text-centered p-0"  data-id={props.id}  onSubmit={props.deleteAccount}>
<div className='py-2 my-2'>
<p className='is-size-7 is-title is-bold'>Delete post?</p>
  <p className='subtitle is-size-7 mt-2'>Are you sure you want to delete this Post?</p>
</div>
  <button type='submit' className='has-text-danger divides-sm py-3 w-100 has-text-centered'>Delete</button>
  <a href='#0' className='has-text-dark py-3 w-100' onClick={props.modalDelete}>Cancel</a>
</form>
  </div>
    )
}




export default ModalConfirm;

