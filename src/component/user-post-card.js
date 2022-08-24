import React from "react";
import { Link } from "react-router-dom";
import maki from "../maki.jpg";
import AnimasiCard from "./animasi-card";

function UserPostCard(props) {
  return (
    <Link to={`/post/${props.data.post_id}`} onClick={props.openModal}>
    <div className="user-post-card" >
      <div className="user-post-content">
      <Link to={`/post/${props.data.post_id}`} onClick={props.openModal}>
        <img
          src={props.data.post_image != null ? props.data.post_image : maki}
        />
        </Link>
              <div className="post-menu">
        <ul className="action">
          <li>
            <a href="javascript:void(0)">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="fa fa-comment" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="fa fa-share" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
      </div>
    </div>
 </Link>
  );
}

export default UserPostCard;
