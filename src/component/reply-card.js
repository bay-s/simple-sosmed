import React from 'react'
import {database} from '../firebase';
import { collection,addDoc,serverTimestamp,query,where,getDocs,doc,setDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import img from '../default.jpg'


function ReplyCard(props){

    return(
        props.isLoading ? <div className="skeleton-card">
        <div className="card-img skeleton">
        </div>
        <div className="card-body">
            <h2 className="card-title skeleton">
            </h2>
            <p className="card-intro skeleton">   
            </p>
        </div>
    </div> :props.reply.map(data => {

                           return <div className='comment-card' key={data.reply_id}>
                                                      <p className='post-texts'>{data.reply_to}</p>
                           <div className='post-info'>
                           <div className='image-wrap'>
                           <img src={data.reply_author_avatar === ''  ? img : data.reply_author_avatar} />
                           </div>
                           <h4 className='username'><Link to={`/account/${data.reply_author_id}`}>{data.reply_author_name}</Link></h4>
                           </div>
                           <div className='comment-content'>
                           <p className='post-text'>{data.reply_text}</p>
                           </div>
                       <div className="action">
              
                       <a href='#0' className='reply' data-comment_id={data.comment_id} onClick={props.isLogin ? props.openReply : props.mustLogin} >Reply to this comment</a>
                       </div>
                     <form className={props.open ? 'modal-form' : 'hide'} onSubmit={props.commentReply}>
                       <div className='comment-inner'>
                       <div className='comment-title'>
                           <p>Reply </p>
                           <textarea name='commentTxt' className='isi-post' placeholder="Write something..." onChange={props.handlerChange}></textarea>
                       </div>
                       </div>
                        <div className='button-container'>
                           <button className='hvr-sweep-to-right cancel' onClick={props.Cancel}>Cancel</button>
                           {props.submit ? <button type='submit' className='hvr-sweep-to-right save' >Send</button> : <button className='hvr-sweep-to-right stop' disabled>Send</button>}
                        </div>
                           </form>
                           </div>
                       }) 
          )
}

export default ReplyCard;