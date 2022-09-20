import React from 'react'
import { Link } from 'react-router-dom'


function sentCard(props){

    return(
<Link to={`/message/${props.msg.message_id}`} className='p-0 has-text-dark'>
<div className='shadow'>
        <header className='is-flex justify-between p-3'>
            <span className='is-title is-size-6'>From: {props.msg.sender_name}</span>
            <a href='#'><i class="fa fa-paperclip"></i></a>
        </header>
         <div className='card-content text-hide '>
         <h4 className='is-bold is-size-6 mb-3'>{props.msg.sender_subject}</h4>
         <p className='subtitle is-6 p-0' >
         {props.msg.sender_text}
          </p>
         </div>
        </div>
</Link>
    )
}

export default sentCard;

