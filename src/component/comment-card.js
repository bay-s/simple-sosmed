
import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../default.jpg";

function CommentCard(props){

    return(
        <div className="comment-box">
        <div className="comment-content" data-id={props.comment_id}>
          <div className="judul-left">
            <img src={props.comment_owner  ? props.comment_owner.images : logo} />
            <h3 className="name"><Link to={`account-detail/${props.comment_owner.username}`}>{props.comment_owner.username}</Link></h3>
          </div>
          <div className="comment-text">
            <p className="paraf">
           {props.isiComment}
            </p>
          </div>
          <ul className="action">
           <li><a href="#0">Likes</a></li> 
           <li><a href="#0">Reply</a></li> 
          </ul>
        </div>
      </div>
    )
}

export default CommentCard;