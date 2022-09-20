import React from 'react'


function MessageReply(props){

    return(
<div className='sender is-flex-column is-flex-gap-sm mt-5'>
<span class="has-background-link-light p-2 is-radius text-small ">
  <span className='has-text-link is-bold'>
  {props.msg.sender_text}
  </span>
</span>
<figure class={props.msg.images === '' ? 'hide' : "w-100"}>
  <img class="w-100" src="https://bulma.io/images/placeholders/128x128.png" />
</figure>
</div>
    )
}

export default MessageReply;