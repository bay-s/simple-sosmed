import React from 'react'
import { Link } from 'react-router-dom';

function ProfilePageAvatarRight(props){

    return(
        <div className="button-action is-flex is-flex-direction-column is-flex-gap-sm">
        <Link to={`/edit-profile/${props.id}`} class="button is-link is-title is-radius"><i class="fa fa-cog is-size-6 mx-3" aria-hidden="true"></i> Edit Profile</Link>
         <button class="button is-danger is-title open-delete is-radius"  onClick={props.openModal}><i class="fa fa-trash mx-3" aria-hidden="true" ></i>Delete Account</button>
        </div>
    )
}

export default ProfilePageAvatarRight;