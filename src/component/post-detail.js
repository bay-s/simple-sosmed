import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import { database} from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function PostDetail(props){
    const {id} = useParams()

    return(
       <PostDetailCard id={id}/>
    )
}

export default PostDetail;

class PostDetailCard extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }


    render(){

        return(
          <div className='container my-fluid '>
<div className='columns post-detail p-0 mx-auto shadow'>
    {/* IMAGE POST */}
    <div className='column is-7 h-100 p-0'>
<figure class="h-100 image is-4by3" >
<img src='https://bulma.io/images/placeholders/1280x960.png'  alt="Placeholder image" />
</figure>
</div>
    {/* END IMAGE POST */}
        {/*POST CAPTION*/}
<div className='column is-5 p-0 is-flex is-flex-column justify-between'>
<header class="modal-card-head has-background-white is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-lg  mt-2'>
<figure class="image is-32x32">
<img src={img} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/`} className='has-text-dark'>@{`post.username`}</Link></p>
<time>{`date`}</time>
</div>
</div>
{/* END MEDIA LEFT */}
<div className='media-right px-3 mt-2'>
<i className="fa fa-trash has-text-danger is-size-5 is-clickable" aria-hidden="true" onClick={this.openModal }></i>
</div>
</header>
<div class="field is-grouped  is-align-items-center border-sm">
<div class="column is-9 p-0 control ">
<input class="input no-border" type="text" placeholder="Text input" />
</div>
<div class="column is-3 p-0 control">
<button type='submit' class="button is-medium is-link is-light pe-5">Post</button>
</div>
</div>
{/* END COMMENT */}
</div>
      {/* END COL RIGHT*/}
          </div>
          </div>
        )
    }
}