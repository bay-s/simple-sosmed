import React from 'react'
import { Link } from 'react-router-dom';
import ButtonFollow from './button-follow';


function UserProfileAvatarRight(props){

    return(
        <div className="button-action is-flex is-flex-column is-flex-gap-sm">
          <Link to={`/send-message/${props.id}`} class="button is-radius is-link is-title is-size-6 is-small">Send Message</Link>
           <ButtonFollow id={props.id} ID={props.ID} data={props.data} />
        </div>
    )
}

export default UserProfileAvatarRight;