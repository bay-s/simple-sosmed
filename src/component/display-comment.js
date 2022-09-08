import React, { useRef } from 'react'
import {database} from '../firebase';
import { collection,addDoc,serverTimestamp,query,where,getDocs,doc,setDoc, updateDoc, arrayUnion,getDocsFromCache} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import img from '../akun.jpg'
import ReplyCard  from './reply-card';

class DisplayComment extends React.Component{
constructor(){
    super()
    this.state = {
     comment:[],
     total_comments:null,
     commentTxt:'',
     open:false,
     view:false,
     openReply:false,
     comment_id:'',
     comment_reply_id:'',
     reply:[],
     reply_id:'',
     comment_owner:'',
     comment_user_id:'',
     container:React.createRef(),
     submit:true,
     isLoading:true,
     month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
    }
}

async componentDidMount(){
    const id = this.props.post_id
    const reply = collection(database,'reply')
    const qReply = query(reply,where("comment_id","==" ,id))

    // GET POST COMMENT
    
    const comment = collection(database,'comment')
    const q1 = query(comment,where("post_id","==" ,id ))
    const post = collection(database,'post')
    const q = query(post,where("post_id","==" ,id ))
    // GET USER DETAIL
 
    await getDocs(q1).then(res => {
        if (res) {
        const result = JSON.stringify(res)

        return this.setState({ 
           comment:this.state.comment = result
           })  
            }
        })

 
      // GET TOTAL POST
  await getDocs(q).then(res => {

  res.docs.map(item => {
        const data = JSON.stringify(item.data())
if(data){
  const totals = JSON.parse(data);
  return this.setState({
    total_comments:this.state.total_comments = totals.total_comment 
    })
}

          });
        })


                 // GET COMMENT REPLY
     await getDocs(qReply).then(res => {
                  res.docs.map(item => {
                      const data = JSON.stringify(item.data());
              if(data){
               const datas = JSON.parse(data);
               return this.setState({
                reply_id:this.state.reply_id = datas.comment_id
                  })
              }
                    })
              }) 


                            // get reply 
if(this.state.comment_reply_id === ''){

}else{
  const q1 = query(comment,where("comment_id","==" ,this.state.comment_reply_id ))
  await getDocs(q1).then(res => {
    res.docs.map(item => {
          const data = item.data().reply;
          return this.setState({
            reply:this.state.reply = data
            })
      })
})
}
}


async componentDidUpdate(){
  const id = this.props.post_id
  const reply = collection(database,'reply')
  const qReply = query(reply,where("comment_id","==" ,id))
  // GET POST COMMENT
  
  const comment = collection(database,'comment')
  const q1 = query(comment,where("post_id","==" ,id ))


  await getDocs(q1).then(res => {
      if (res) {
      return this.setState({ 
         comment:this.state.comment = res
         })  
          }
      })

      // GET TOTAL POST
      await getDocs(q1).then(res => {

        res.docs.map(item => {
              const data = JSON.stringify(item.data())
      if(data){
        const totals = JSON.parse(data);
        return this.setState({
          total_comments:this.state.total_comments = totals.total_comment ,
          isLoading:this.state.isLoading = false
          })
      }
      
                });
              })
      

            // GET COMMENT REPLY
            await getDocs(qReply).then(res => {
                  res.docs.map(item => {
                      const data = JSON.stringify(item.data());
              if(data){
               const datas = JSON.parse(data);
               return this.setState({
                reply_id:this.state.reply_id = datas.comment_id
                  })
              }
                    })
              })


              // get reply 
if(this.state.comment_reply_id === ''){

}else{
  const q1 = query(comment,where("comment_id","==" ,this.state.comment_reply_id ))
  await getDocs(q1).then(res => {
    res.docs.map(item => {
          const data = item.data().reply;
          return this.setState({
            reply:this.state.reply = data
            })
      })
})
}


}

  
handlerChange = (e) => {
  const {name,value} = e.target
  this.setState(prev => {
    return{
 [name]:value
    }
  })

}

commentNotif = (ranID) => {
  const notif_id =  this.state.comment_user_id

  const docUpdate = doc(database,'notifikasi',notif_id ) // ADD NOTIF

  updateDoc(docUpdate,{
              notif:arrayUnion({
                  pesan:`${this.props.user_name} Telah membalas komentar anda`,
                  user_name:this.props.user_name,
                  user_id:this.props.user_id,
                  user_avatar:this.props.avatar,
                  post_id:this.props.post_id,
                })
        })
  .then(() => {console.log("notif me senpai")})
  .catch((err) => {console.log(err)}); 

}

commentReply = e => {
    e.preventDefault()
    const ranID = (Math.random() + 1).toString(36).substring(1);
    const docUpdate = doc(database,'comment',this.state.comment_id)

if(this.state.commentTxt.length < 3 ){
  alert("COMMENT ATLEAST 3 CHARACTER")
}else{
  this.setState({
    submit:this.state.submit = false
  })

updateDoc(docUpdate,{
  reply:arrayUnion({
  reply_id:ranID,
  reply_to:`${this.props.user_name} Has replied to a comment from ${this.state.comment_owner}`,
  reply_author_name:this.props.user_name,
  reply_author_avatar:this.props.avatar,
  reply_author_id:this.props.user_id,
  reply_text:this.state.commentTxt,
  comment_id:this.state.comment_id
})
})
.then(() => {
  alert("reply sukses")
  this.setState({
    view:this.state.view = false,
    open:this.state.open = false,
    submit:this.state.submit = true
  })
  // this.commentNotif()
  e.target.reset()
})
.catch((err) => {
  console.log(err)
  this.setState({
    submit:this.state.submit = true
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

openReply = (e) => {
  e.preventDefault()
  const com_id = e.target.dataset.comment_id
  const targets = e.target.parentElement.previousSibling.previousSibling.firstChild.nextSibling.textContent;
  const target_id = e.target.parentElement.previousSibling.previousSibling.firstChild.nextSibling.dataset.com_id
  console.log(com_id);
  this.setState({
    comment_id:this.state.comment_id = com_id,
    comment_owner:this.state.comment_owner = targets
  })
 if(e.target.classList.contains('reply')){
this.setState({openReply:this.state.openReply = true})
 }
else{
  this.setState({open:this.state.openReply = false})
 }
}


render(){



const commentCard = Array.isArray(this.state.comment.docs) ? this.state.comment.docs.map((com,index) => {
   const data = com.data()
 const  timestamp = data .timestamp !== null ? data.seconds : ""
const time = new Date(timestamp*1000)
const date = `${time.getDate()} ${this.state.month[time.getMonth()]} ${time.getFullYear()}`

 if(data.post_id === this.props.post_id){
    return <div className='is-flex is-flex-column align-start p-2' key={index}>
<div className='media-left is-flex is-flex-gap-md align-center'>
<figure class="image is-32x32 avatar">
<img src={data.user_avatar === ''  ? img : data .user_avatar} className='is-rounded' alt="Placeholder image" />
</figure>
<div className='is-flex is-flex-column'>
<div class="is-flex is-flex-gap-md align-center">
<p class="subtitle is-7 is-title p-0 mb-1 is-bold" data-com_id={data.comment_author_id}><Link to={`/profile/${data.comment_author_id}`} className='has-text-dark'>{data.comment_author_name}</Link></p>
<p className='post-text is-size-7'>{data.comment_text}</p>
</div>
<div className="action is-flex is-flex-gap-md align-center">
<time className='subtitle is-7 has-text-grey-light p-0 m-0 is-title is-bold'>12 august 2022</time>
<a href='#0' className='reply is-size-7 has-text-weight-semibold has-text-dark' data-comment_id={data.comment_id} title={index} onClick={this.openReplyComment}>Reply</a>
<a href='#0' className='view' data-comment_id={data.comment_id} onClick={this.viewReply}>{data.reply.length > 0 ?  `View ${data.reply.length} Reply` : ""}</a>
</div>
</div>
</div>

    </div>
 }
 
}) : ""
    return(
<div className='comment-container'>
{ this.state.comment.length == 0 ? "" : commentCard}
{/* {this.state.reply.length < 1 ? "" : <ReplyCard  reply={this.state.reply} reply_id={this.state.comment_id}  post_id={this.props.post_id} open={this.state.openReply} openReply={this.openReply} Cancel={this.Cancel} commentReply={this.commentReply} handlerChange={this.handlerChange}/> } */}
 </div>
    )
}

}


export default DisplayComment;



