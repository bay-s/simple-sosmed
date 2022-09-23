
import React from 'react'
import {database} from '../firebase';
import { collection,setDoc, arrayUnion,getDocs, doc,where, updateDoc,query, addDoc} from 'firebase/firestore';
import { Link, useParams,Navigate} from 'react-router-dom'
import img from '../akun.jpg'
import SendMessageAvatar from './send-message-avatar';
import SendMessageForms from './send-message-forms';
import MessageSender from './message-sender';
import MessageReply from './message-reply';
import MessageAvatar from './message-avatar';

function SendMessage(props){
    const {id} = useParams();
    const ID = props.id
    return(
     <SendMessageForm id={id} dataUser={props.dataUser} ID={ID}/>
    )
}

export default SendMessage;

class SendMessageForm extends React.Component{
    constructor(){
        super()
        this.state = {
          dataUser:[],
          listMessage:[],
          listSent:[],
          sender_id:'',
            }
    }
 
async componentDidMount(){
      const id = this.props.id
      const db2 = collection(database,'user')
      const q2 = query(db2 ,where("uid","==" ,id ))
      const allMessage =collection(database,'private_message')

      await getDocs(allMessage).then((res) => {
        res.docs.map((item) => {
          const data = item.data()

          return this.setState({
            listMessage:data.sender_message,
            listSent:data.reply_message,
            sender_id:data.message_from
          });
        });
      });

      // GET USER LOGIN
      await getDocs(q2).then(res => {
        res.docs.map(item => {
          const data = item.data()
          console.log(data);
        return this.setState({ dataUser:data})  
            })
        })    
  }
  
  // async componentDidUpdate(){
  //   const allMessage =collection(database,'private_message')

  //   await getDocs(allMessage).then((res) => {
  //     res.docs.map((item) => {
  //       const data = item.data();
  //       return this.setState({
  //         listMessage:data.sender_message,
  //         listSent:data.reply_message,
  //         sender_id:data.message_from
  //       });
  //     });
  //   });
  // }
render(){

  const messasgeCard = this.state.listMessage.length < 1 ? "" : this.state.listMessage.map((msg,index) => {return <MessageSender msg={msg} key={index} index={index}/>});
  const sentCard = this.state.listSent.length < 1 ? "" : this.state.listSent.map((msg,index) => { return <MessageReply msg={msg} key={index} index={index}/>});  
  const MessageAvatars = this.state.listMessage.length < 1 ? "" : this.state.listMessage.map((msg,index) => {return <MessageAvatar msg={msg} key={index} index={index}/>});

    return(
 <div className='container message-container'>
        <div className='columns is-multiline is-centered'>
        <div className='column is-7 p-0 shadow mt-4 box'>
        <SendMessageForms id={this.props.id} ID={this.props.ID} dataUser={this.props.dataUser} />
        </div>
         </div>
 </div>
    )
}
}
