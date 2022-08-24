import React from "react";
import maki from "../maki.jpg";
import { database} from "../firebase";
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot , setDoc, query, where} from 'firebase/firestore';
import CommentCard from "./comment-card";
import AnimasiCard from "./animasi-card";



class ModalImage extends React.Component{
  constructor(){
    super()
    this.state = {
   comment:'',
   userOnline:'',
   isi_comment:'',
   comment_owner_id:'',
   comment_id:'',
comment_owner:[],
loading:true
    }
  }

async  componentDidMount(){
// get user online
    
const db = collection(database,'user')
const id = this.props.ids

const q = query(db,where("uid","==" , id))
// GET USER DETAIL
await getDocs(q).then(res => {
    res.docs.map(item => {
    const data = item.data()
      return this.setState({ 
        userOnline:this.state.userOnline = data.username,
        uid:this.state.uid = data.uid
        })  
      });
    })

    // GET POST COMMENT
    
const comment = collection(database,'comment')
const ids = this.props.dataModal.post_id
const q1 = query(comment,where("post_id","==" ,ids ))
// GET USER DETAIL
await getDocs(q1).then(res => {
    res.docs.map(item => {
    const data = item.data()
return this.setState({
  isi_comment:this.state.isi_comment = data.comment_text,
  comment_owner_id:this.state.comment_owner_id = data.comment_user_id,
  comment_id:this.state.comment_id = data.comment_id
})
      });
    })


    // GET COMMENT OWNER 

const comment_owner_id = this.state.comment_owner_id

const querys = query(db,where("uid","==" ,comment_owner_id ))
// GET USER DETAIL
await getDocs(querys).then(res => {
    res.docs.map(item => {
    const data = item.data()
return this.setState({comment_owner:this.state.comment_owner = data})
      });
    })

    const animate = this.state.comment_owner.length == 0  ? this.setState({loading:this.state.loading = true}) : this.setState({loading:this.state.loading = false}) 
    

  }



  commentTxt = (e) => {
    const {name,value} = e.target
    console.log(this.state.comment);
    this.setState(prev => {
      return{
   [name]:value
      }
    })
  }
  postComment = (e) => {
    e.preventDefault()

    const ranID = (Math.random() + 1).toString(36).substring(1);
    const db = collection(database,"comment")
    const id = this.props.ids
if (this.state.comment.length < 5) {

}else{
  addDoc(db , {
    comment_id:ranID,
    comment_user_id:id,
    comment_text:this.state.comment,
    comment_to:this.props.name,
    comment_owner:this.state.userOnline,
    post_id:this.props.dataModal.post_id
    })
    .then(() =>{
    alert("comment posted")
    e.target.reset()
    window.location.reload()
    })
    .catch(err => {
    alert(err.message)
    })
}
  }
 render(){

  return (
    <div className="modal-post-container">
      <div className="modal-posts">
        <div className="modal-images">
          <img src={this.props.dataModal.post_image} />
        </div>
        <div className="modal-caption">
          <div className="modal-post-title">
            <div className="judul-left">
            <img src={this.props.image} />
            <h3 className="name">{this.props.name}</h3>
            </div>
            <a href="#0">
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
            </a>
          </div>
<div className="modal-content">
<div className="caption-box">
            <div className="judul-left">
              <img src={this.props.image} />
              <h3 className="name">{this.props.name}</h3>
            </div>
            <div className="caption-text">
              <p className="paraf">
              {this.props.dataModal.caption}
              </p>
            </div>
          </div>


{this.state.comment_owner.length == 0 ? "" :  <CommentCard comment_id={this.state.comment_id} comment_owner={this.state.comment_owner} isiComment={this.state.isi_comment}/>}
{/* END COMMENT BOX */}
</div>
<div className="post-menu-container">
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
            <div className="total-like">
              <p className="likes">
               Be de first likes
              </p>
            </div>
          </div>
         <form className="input-comment" onSubmit={this.postComment}>
         <textarea name="comment" onChange={this.commentTxt} placeholder="Tambahkan komentar.."></textarea>
            <button type="submit">Post</button>
         </form>
</div>
        </div>
      </div>
    </div>
  )
 }
}

export default ModalImage;
