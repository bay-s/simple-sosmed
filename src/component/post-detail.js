import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import {database,auth} from '../firebase';
import { collection, getDocs,updateDoc,setDoc,serverTimestamp,query, where,doc, deleteDoc,getDocFromCache} from 'firebase/firestore';
import NoCommentYet from './no-commeny-yet';
import LikesCard from './likes_card';
import DisplayComment from './display-comment';


function PostDetail(props){
    const {id} = useParams()

    return(
       <PostDetailCard id={id} name={props.name} user_id={props.id} avatar={props.avatar} />
    )
}

export default PostDetail;

class PostDetailCard extends React.Component{
    constructor(){
        super()
        this.state = {
            dataPost:[],
            user_id:'',
            loading:true,
            hide:false,
            total:null,
            total_comment:0,
            username:'',
            avatar:''
        }
    }

    async componentDidMount(){
        const id = this.props.id
        const db = collection(database,'post')
        const q = query(db ,where("post_id","==" , id))
             //  GET ALL POIST

  await getDocs(q).then(res => {
    if (res) {
        res.docs.map(item => {
            const data = item.data()
            console.log(data);
    return this.setState({ 
        dataPost:this.state.dataPost = data,
        total:this.state.total = data.total_likes,
        total_comment:data.total_comment,
        loading:this.state. loading = false,
        user_id:this.state.dataPost.user_id
       })  
          })
        }
    })


    }

    async componentDidUpdate(){
      const db2 = collection(database,'user')
      const q2 = query(db2 ,where("uid","==" , this.state.user_id))

      // GET USER LOGIN

      
await getDocs(q2).then(res => {
  res.docs.map(item => {
    const data = item.data()
return this.setState({ 
username:data.username,
avatar:data.images
})  
  })
  })
       
    }
    
handlerChange = (e) => {
    const {name,value} = e.target
    this.setState({[name]:value})
    if(value.length > 0){
        this.setState({hide:this.state.hide = true})
    }else{
        this.setState({hide:this.state.hide = false})
    }
  }
  

  commentNotif = (ranID) => {
    const notif_id =  this.props.user_id
  
    const docUpdate = doc(database,'notifikasi',notif_id ) // ADD NOTIF
    const time = serverTimestamp()
  
    updateDoc(docUpdate,{
                notif:arrayUnion({
                    pesan:`${this.props.name} Telah mengomentari postingan anda`,
                    user_name:this.props.name,
                    user_id:this.props.user_id,
                    user_avatar:this.props.avatar,
                    post_id:this.props.id,
                  })
          })
    .then(() => {console.log("notif me senpai")})
    .catch((err) => {console.log(err)}); 
  
  }
  
  createReply = () => {
    const db = collection(database,'reply');
    const user_id = this.props.id
    setDoc(doc(db,user_id ),  {
         original_reply:[],
         user_reply:[],
         comment_id:this.props.id
      })
      .then(() => {console.log("notif sukses")})  
      .catch((err) => {
        console.log(err);
      })
  }
  
  postComment = (e) => {
    e.preventDefault()
    const ranID = (Math.random() + 1).toString(36).substring(1);
    const db = collection(database,"comment")
    const id = this.props.user_id
    const post_id = this.props.id
    const docUpdate =doc(database,"post",post_id)
  if (this.state.comment.length < 2) {
  alert("Too short")
  }else{
    this.setState({hide:this.state.hide = false})
    // this.createReply()
    // this.commentNotif(ranID)
    updateDoc(docUpdate,{
        total_comment: + 1
      })
      setDoc(doc(db,ranID),  {
        comment_id:ranID,
        comment_author_id:id,
        post_id: post_id,
        post_owner_id:this.props.user_id,
        comment_text:this.state.comment,
        comment_author_name:this.props.name,
        user_avatar:this.props.avatar,
        timestamp: serverTimestamp(),
        reply:[]
        })
        .then(() =>{
        alert("comment posted")
        this.setState({hide:this.state.hide = true})
        e.target.reset()
        })
        .catch(err => {alert(err.message)})
  }
  }
  
  
  
    render(){

     const comment = <DisplayComment key={this.props.id} post_id={this.props.id} user_id={this.props.user_id} avatar={this.props.avatar} user_name={this.props.name} />
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
      
<div className='column is-4 p-0 is-flex is-flex-column is-flex-gap-sm'>
<header class="modal-card-head has-background-white p-0 p-2 is-flex align-center justify-between">
<div className='media-left is-flex is-flex-gap-md align-center'>
<figure class="image is-32x32 avatar">
<img src={this.state.avatar === '' ? img : this.state.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${this.state.dataPost.user_id}`} className='has-text-dark'>{this.state.username}</Link></p>
</div>
</div>
{/* END MEDIA LEFT */}
<div className={this.props.id === this.state.dataPost.user_id ? 'media-right px-3 mt-2' : 'hide'}>
<i className="fa fa-trash has-text-danger is-size-5 is-clickable" aria-hidden="true" onClick={``}></i>
</div>
</header>
<div className='media-left is-flex is-flex-gap-md align-center p-2'>
<figure class="image is-32x32 avatar">
<img src={this.state.avatar === '' ? img : this.state.avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0">
<p class="subtitle is-7 is-title p-0 mb-1"><Link to={`/profile/${this.state.dataPost.user_id}`} className='has-text-dark'>{this.state.username}</Link></p>
</div>
<span className='is-7 p-0'>{this.state.dataPost.post_caption}</span>
</div>
{/* END MEDIA LEFT */}

{/*END POST CAPTION */}
{/* START COMMENT CONTENT */}
<div className='is-flex is-flex-column is-flex-gap-md p-0 my-auto is-flex-grow-1'>
{this.state.total_comment > 0 ? comment : <NoCommentYet />}
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
<form class="field is-grouped  is-align-items-center " onSubmit={this.postComment}>
<div class="field has-addons w-100">
  <div class="control w-100">
    <input class="input" type="text" name='comment' placeholder="write something"  onChange={this.handlerChange}/>
  </div>
  <div class="control">
{this.state.hide ? <button type='submit' class="button is-info">
      Post
    </button> : <button class="button is-info" disabled>
      Post
    </button>}
  </div>
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


