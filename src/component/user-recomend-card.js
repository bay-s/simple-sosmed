import React from 'react'


function UserRecomendCard(){

    return(
<div className='carousel py-4 is-flex is-justify-content-space-around'>
     <div className='user is-flex is-flex-direction-column is-flex-gap-sm is-align-items-center'>
        <figure className="image is-48x48">
         <img className="is-rounded avatar" src="https://bulma.io/images/placeholders/128x128.png" alt=''/> 
       </figure>
       <h5 className='has-text-dark has-text-weight-bold is-size-6'>Some user</h5>
        </div>
        <div className='user is-flex is-flex-direction-column is-flex-gap-sm is-align-items-center'>
        <figure className="image is-48x48">
         <img className="is-rounded avatar" src="https://bulma.io/images/placeholders/128x128.png" alt=''/> 
       </figure>
       <h5 className='has-text-dark has-text-weight-bold is-size-6'>Some user</h5>
        </div>
        <div className='user is-flex is-flex-direction-column is-flex-gap-sm is-align-items-center'>
        <figure className="image is-48x48">
         <img className="is-rounded avatar" src="https://bulma.io/images/placeholders/128x128.png" alt=''/> 
       </figure>
       <h5 className='has-text-dark has-text-weight-bold is-size-6'>Some user</h5>
        </div>
        <div className='user is-flex is-flex-direction-column is-flex-gap-sm is-align-items-center'>
        <figure className="image is-48x48">
         <img className="is-rounded avatar" src="https://bulma.io/images/placeholders/128x128.png" alt=''/> 
       </figure>
       <h5 className='has-text-dark has-text-weight-bold is-size-6'>Some user</h5>
    </div>
</div>
    )
}

export default UserRecomendCard;