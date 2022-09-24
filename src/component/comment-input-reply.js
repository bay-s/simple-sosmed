import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import img from '../akun.jpg'
import {database,auth} from '../firebase';
import { collection,arrayUnion, getDocs,updateDoc,setDoc,serverTimestamp,query, where,doc, deleteDoc,getDocFromCache} from 'firebase/firestore';


class ReplyComment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user_id:'',
            loading:true,
            hide:false,
            total:null,
            total_comment:this.props.total_comment,
            username:'',
            avatar:'',
            comment:''
        }
    }

       
    handlerChange = (e) => {
      const {name,value} = e.target
      this.setState({[name]:value})
      if(value.length > 0){
          this.setState({hide:true})
      }else{
          this.setState({hide:false})
      }
    }
    
    commentNotif = (ranID) => {
      const notif_id = this.props.author_id
      const docUpdate = doc(database,'notifikasi',notif_id ) // ADD NOTIF
    
      updateDoc(docUpdate,{
                  notif:arrayUnion({
                      pesan:`${this.props.dataUser.username} Telah membalas komentar anda`,
                      user_name:this.props.dataUser.username,
                      user_id:this.props.dataUser.uid,
                      user_avatar:this.props.dataUser.images,
                      post_id:this.props.post_id,
                    })
            })
      .then(() => {console.log("notif me senpai")})
      .catch((err) => {console.log(err)}); 
    
    }
    
    commentReply = e => {
        e.preventDefault()
        const ranID = (Math.random() + 1).toString(36).substring(1);
        const docUpdate = doc(database,'comment',this.props.com_id)
    
    if(this.state.comment.length < 3 ){
      alert("COMMENT ATLEAST 3 CHARACTER")
    }else{
      this.setState({
        submit:this.state.submit = false
      })
    
    updateDoc(docUpdate,{
      reply:arrayUnion({
      reply_id:ranID,
      reply_to:`${this.props.dataUser.username} Has replied to a comment from ${this.props.author_id}`,
      reply_author_name:this.props.dataUser.username,
      reply_author_avatar:this.props.dataUser.images,
      reply_author_id:this.props.dataUser.uid,
      reply_text:this.state.comment,
      comment_id:this.props.com_id,
      timestamp:this.timeStamp ()
    })
    })
    .then(() => {
      alert("reply sukses")
      this.setState({

      })
      // this.commentNotif()
      e.target.reset()
    })
    .catch((err) => {
      console.log(err)
      this.setState({

      })
    }
    ); 
    }
    }  
    
    openReplyComment = (e) => {
      e.preventDefault()
      const replyContainer = e.target.parentElement.previousElementSibling.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling
      const com_id = e.target.dataset.comment_id
      const targets = e.target.parentElement.previousSibling.previousSibling.firstChild.nextSibling.textContent;
      const target_id = e.target.parentElement.previousSibling.previousSibling.firstChild.nextSibling.dataset.com_id
    
    
      replyContainer.classList.toggle('hide')
      this.setState({
        comment_id:this.state.comment_id = com_id,
        comment_owner:this.state.comment_owner = targets,
        comment_user_id:this.state.comment_user_id = target_id,
      })
    
     if(e.target.classList.contains('reply')){
    this.setState({open:this.state.open = true})
     }
    else{
      this.setState({open:this.state.open = false})
     }
    }
    
    
    viewReply = (e) => {
      e.preventDefault()
      const com_id = e.target.dataset.comment_id
      const viewContainer = e.target.parentElement.previousElementSibling.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
    
    this.setState({comment_reply_id:this.state.comment_reply_id = com_id})
    viewContainer.classList.toggle('hide')
   
    }
      

    timeStamp = () => {
      const m = ['January','February','March','April','May','June','July','August','September','Oktober','November','December']
      const dates = new Date();
      const hours = dates.getHours() 
      const min = dates.getMinutes()
      const date = dates.getDate()
      const month = m[dates.getMonth()];
      const year = dates.getUTCFullYear()
      
      return `${date} ${month} ${year} ${hours}.${min}`;
      }
    
  render(){

    return(
<form class="field has-addons" onSubmit={this.commentReply}>
  <div class="control w-100">
    <input class="input no-radius" type="text" name='comment' placeholder="Write something" onChange={this.handlerChange}/>
  </div>
  <div class="control">
{this.state.hide ? <button type='submit' class="button is-info no-radius">
      Reply
   </button> : <button class="button is-info no-radius" disabled>
      Reply
    </button>}
  </div>
</form>
    )
  }
}

export default ReplyComment;