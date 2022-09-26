import React, { useRef } from 'react'
import {database} from '../firebase';
import { collection,addDoc,onSnapshot,serverTimestamp,query,where,getDocs,doc,setDoc, updateDoc, arrayUnion,getDocsFromCache} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import img from '../akun.jpg'
import ReplyCard  from './reply-card';
import ReplyComment from './comment-input-reply';
import CommentCard from './comment-card';
import AnimasiEllipsis from './animasi-ellips';

class DisplayComment extends React.Component{
constructor(){
    super()
    this.state = {
     comment:[],
     total_comments:null,
     commentTxt:'',
     open:false,
     view:true,
     openReply:false,
     comment_id:'',
     comment_reply_id:'',
     reply:[],
     reply_id:'',
     comment_owner:'',
     comment_user_id:'',
     submit:true,
     isLoading:true,
     month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
     replyRef:React.createRef()
    }
}

async componentDidMount(){
    const id = this.props.post_id
    const reply = collection(database,'reply')
    const qReply = query(reply,where("comment_id","==" ,id))
    const comment = collection(database,'comment')
    const q1 = query(comment,where("post_id","==" ,id ))
    const post = collection(database,'post')
    const q = query(post,where("post_id","==" ,id ))
    // GET POST COMMENT
    await getDocs(q1).then(res => {
        if (res) {
      return this.setState({ 
           comment:res,
           isLoading:false
           })  
            }
        })

        // onSnapshot(doc(comment), (doc) => {
        //   console.log("Current data: ", doc.data());
        //  });

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

displayReply = e => {
e.preventDefault()
this.setState({view:!this.state.view})
const index = e.target.dataset.index
const ref = e.target.parentElement.parentElement.firstChild.nextElementSibling
ref.classList.toggle('hide')
// console.log(ref.classList.contains(`test${index}`));
}
render(){

const commentCard = Array.isArray(this.state.comment.docs) ? this.state.comment.docs.map((com,index) => {
const data = com.data()
const  timestamp = data.timestamp == null ? "" : data.timestamp.seconds
const time = new Date(timestamp*1000)
const date = `${time.getDate()} ${this.state.month[time.getMonth()]}`

return data.post_id === this.props.post_id ? <CommentCard replyRef={this.state.replyRef} openReply={this.props.openReply} displayReply={this.displayReply} view={this.state.view}  data={data} date={date} post_id={CommentCard} index={index}/> : ""
}) : ""

return(
this.state.isLoading ?<AnimasiEllipsis /> :  commentCard 
)

}

}


export default DisplayComment;



