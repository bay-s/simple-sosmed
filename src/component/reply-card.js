import React from 'react'
import {database} from '../firebase';
import { collection,addDoc,serverTimestamp,query,where,getDocs,doc,setDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import img from '../default.jpg'


function ReplyCard(props){

    return(

<div className='media-left is-flex is-flex-gap-md align-center w-100 p-0 m-0' key={props.index}>
<figure class="image is-32x32 avatar">
<img src={props.data.reply_author_avatar === ''  ? img : props.data.reply_author_avatar} className='is-rounded' />
</figure>
<div className='is-flex is-flex-column'>
<div class="is-flex is-flex-gap-md align-center mb-1">
<p class="subtitle text-small is-title p-0 m-0 is-bold" data-com_id={props.data.reply_author_id}><Link to={`/profile/${props.data.reply_author_id}`} className='has-text-dark text-nowrap text-small'>{props.data.reply_author_name}</Link></p>
<p className='post-text is-size-7 p-0 m-0'>{props.data.reply_text}</p>
</div>
{/* START COMMENT TEXT */}
<div className="is-flex is-flex-gap-md align-center">
<time className='subtitle text-small  has-text-grey-light p-0 m-0 is-title is-bold'>{props.data.timestamp}</time>
<button className='no-border text-small has-text-weight-semibold has-text-dark' data-comment_id={props.data.comment_id} data-user={props.data.reply_author_name} data-author_id={props.data.reply_author_id} title={props.index} onClick={props.openReply}>Reply</button>
</div>
{/* END COMMENT TEXT */}
</div>
{/* END COMMENT */}
</div>

          )
}

export default ReplyCard;




