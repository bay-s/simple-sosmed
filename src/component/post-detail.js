import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import {database} from '../firebase';
import { collection, getDocs,query, where,doc,updateDoc,addDoc,arrayUnion,serverTimestamp, arrayRemove} from 'firebase/firestore';
import NoCommentYet from './no-commeny-yet';
import LikesCard from './likes_card';


function PostDetail(props){
    const {id} = useParams()

    return(
       <PostDetailCard id={id} name={props.name} avatar={props.avatar} />
    )
}

export default PostDetail;

class PostDetailCard extends React.Component{
    constructor(){
        super()
        this.state = {
            dataPost:[],
            avatar:'',
            username:'',
            loading:true,
            getAvatar:[],
            avatar_id:[]
        }
    }

    async componentDidMount(){
        const id = this.props.id
        const db = collection(database,'post')
        const q = query(db ,where("post_id","==" , id))


        // GET USER LOGIN
     getDocs(q).then(res => {
          res.docs.map(item => {
          const data = item.data()
          console.log(data);
            return this.setState({ 
                username:this.state.username = data.username,
              avatar:this.state.avatar = data.images,
              })  
            });
          })
        
                      //  GET ALL POIST

  await getDocs(q).then(res => {
    if (res) {
        res.docs.map(item => {
            const data = item.data()
            console.log(data);
    return this.setState({ 
        dataPost:this.state.dataPost = data,
        total:this.state.total = data.total_likes,
        loading:this.state. loading = false,
       })  
          })
        }
    })


    }

    render(){


        return(
<div className='container my-fluid '>
<div className='column is-9 mx-auto shadow'>
<div className='columns is-centered p-0  h-500px'>
  {/* IMAGE POST */}
  <div className='column is-8 h-100 p-0'>
<figure class="h-100 image is-4by3">
<img src={this.state.dataPost.post_image} alt="Placeholder image" />
</figure>
</div>
  {/* END IMAGE POST */}
      {/*POST CAPTION*/}
<div className='column is-4 p-0 is-flex is-flex-column justify-between'>
<header class="modal-card-head has-background-white is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-md align-center'>
<figure class="image is-32x32 avatar">
<img src={this.props.avatar === '' ? img : this.props.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${this.state.dataPost.user_id}`} className='has-text-dark'>@{this.props.name}</Link></p>
</div>
</div>
{/* END MEDIA LEFT */}

<div className={this.props.id === this.state.dataPost.user_id ? 'media-right px-3 mt-2' : 'hide'}>
<i className="fa fa-trash has-text-danger is-size-5 is-clickable" aria-hidden="true" onClick={``}></i>
</div>
</header>
{/* START COMMENT CONTENT */}
<div className='is-flex is-flex-column is-flex-gap-md p-2'>
<NoCommentYet />
</div>
{/* ENDCOMMENT CONTENT */}

{/* START COMMENT INPUT */}
<div className='is-flex is-flex-column'>
<div className='p-3 is-flex is-flex-column border-sm'>
{<LikesCard id={this.state.dataPost.user_id} avatar={this.props.avatar} name={this.props.name} post_id={this.state.dataPost.post_id} />}
<div className='mt-2'>
<p className='subtitle is-7 p-0 m-0 is-title is-bold'>
{this.state.total > 0 ? `${this.state.total } Like`: 'Be the first to'}
</p> 
<time className='subtitle is-7 p-0 m-0 is-title is-bold'>12 august 2022</time>
</div>
</div>
<form class="field is-grouped  is-align-items-center border-sm" onSubmit={this.postComment}>
<div class="column is-9 p-0 control ">
<input class="input no-border" type="text" name='comment' placeholder="Text input" onChange={this.handlerChange}/>
</div>
<div class="column is-3 p-0 control">
 <button type='submit' class="button is-medium is-link is-light is-fullwidth">Post</button>
</div>
</form>
</div>
{/* END COMMENT */}
</div>
    {/* END COL RIGHT */}
</div>
</div>
          </div>
        )
    }
}


