import React from 'react'
import img from '../akun.jpg'
import { Link } from 'react-router-dom'
import {database} from '../firebase';
import { doc, deleteDoc,collection, getDocs,query, where, updateDoc} from 'firebase/firestore';
import ModalPostDetail from './modal-detail';
import ModalDelete from './delete-modal';


class PostCard extends React.Component{
constructor(props){
    super(props)
    this.state = {
    getAvatar:[],
    modalDelete:true,
    modalPost:true,
    month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
    post_detail_id:''
    }
}

async componentDidMount(){
    const db = collection(database,"user")
    const id = this.props.post.user_id

    const q = query(db ,where("uid","==" , id))

  // GET AVATAR
  await getDocs(q).then(res => {
    res.docs.map(item => {
    const data = item.data()
return this.setState({getAvatar:this.state.getAvatar = data.images})
      });
    })

}


deletePost = (e) => {
    e.preventDefault()
    const id = e.target.dataset.post_id
    const user =  doc(database,'user',this.props.id )
    const docDelete = doc(database,'post',id )
    const docUpdate = doc(database,'user',this.props.id) 

updateDoc(user,{total_post:this.state.total_post - 1})
deleteDoc( docDelete)
.then(() =>{
alert("delete sukses")
this.setState({modalDelete:!this.state.modalDelete})
})
.catch(err => {
console.log(err.message);
})
     
    }


openModalPost = e  => {
 e.preventDefault()
 const data_id = e.target.dataset.id
this.setState({
    modalPost:!this.state.modalPost,
    post_detail_id:data_id
})

    }

openModalDelete = e  => {
      e.preventDefault()
this.setState({modalDelete:!this.state.modalDelete})
  }


render(){

const timestamp = this.props.post == null ? "" : this.props.post.timestamp.seconds 
const time = new Date(timestamp*1000)
const date = `${time.getDate()} ${this.state.month[time.getMonth()]} ${time.getFullYear()}`
console.log(this.props);
    return(
<>      
<div className='column is-4'>
<div class="card posts-card">
<div class="card-image is-relative profile-post">
<figure class="image is-4by3">
<Link to={`/post/${this.props.post.post_id}`}>
<img src={this.props.post.post_image} alt="Placeholder image"  data-id={this.props.post.post_id} onClick={this.openModalPost}/>
</Link>
</figure>
<div className='comments'>
<a href='#'><i class="fa fa-comment has-text-white is-size-4" aria-hidden="true"></i></a>
</div>
</div> 
{/* END CARD IMAGE */}
</div>
</div>



<div className={this.state.modalPost ? 'modal' : 'modal is-active modal-post'}>
 <div class="modal-background"></div>
<ModalPostDetail  id={this.props.id} name={this.props.name} post={this.props.post} avatar={this.state.getAvatar} openModalPost={this.openModalPost} />
 <button class="modal-close is-large" aria-label="close" onClick={this.openModalPost}></button>
 </div>


 <div className={this.state.modalDelete ? 'modal' : 'modal is-active'}>
 <div class="modal-background"></div>
<ModalDelete post_id={this.props.post.post_id} modalDelete={this.openModalDelete } deletePost={this.deletePost} />
 <button class="modal-close is-large" aria-label="close" onClick={this.openModalDelete }></button>
 </div>
</>
    )
}

}

export default PostCard;