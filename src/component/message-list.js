import React from 'react'
import {database} from '../firebase';
import { collection, arrayUnion,getDocs, doc,where, updateDoc,query} from 'firebase/firestore';
import img from '../akun.jpg'
import MessageCard from './message-card';
import { Link, useParams} from 'react-router-dom'
import SentCard from './sent-card';


function MessageList(props){
const {id} = useParams()
const ID = props.ID

return(
    <MessageListCard id={id} ID={ID} dataUser={props.dataUser}/>
)
}

export default MessageList;

class MessageListCard extends React.Component{
    constructor(){
      super()
      this.state = {
       listMessage:[],
       listSent:[],
       tab:'inbox'
      }
    }

    async componentDidMount(){
        const list_message = collection(database,'user');
        const id = this.props.ID
        const qMsg = query(list_message, where("uid", "==",id));

                // GET SENDER MESSAGE
                await getDocs(qMsg ).then((res) => {
                  res.docs.map((item) => {
                    const data = item.data();
                    return this.setState({
                      listMessage:data.private_message,
                      listSent:data.sent_message
                    });
                  });
                });
      
      }
      

         
openTab = e => {
e.preventDefault()
const tabs = e.target.dataset.tab
this.setState({tab:tabs})
console.log(tabs);
}
      
    render(){
     const messasgeCard = this.state.listMessage.length < 1 ? "" : this.state.listMessage.map((msg,index) => {return <MessageCard msg={msg} key={index} index={index}/>});
     const sentCard = this.state.listSent.length < 1 ? "" : this.state.listSent.map((msg,index) => { return <SentCard msg={msg} key={index} index={index}/>});  

        return(
            <div className='container my-fluid my-3'>
    <div class="columns is-centered is-multiline" id="mail-app">
        <aside class="column is-2 shadow h-100 p-0">
            <div>
                <ul class="is-flex is-flex-column main">
                <li className={this.state.tab === 'inbox' ? 'button is-flex is-flex-gap-sm align-center is-info' :'button is-flex is-flex-gap-sm align-center z-index' } data-tab='inbox' onClick={this.openTab}>
                    <span class="icon" ><i class="fa fa-inbox " data-tab='inbox'></i></span>
                    <span class="name" data-tab='inbox'>Inbox</span>
                    {this.state.listMessage.length < 1 ? "" : <span className='tag is-info'>{this.state.listMessage.length}</span>}
                   </li>
                   <li className={this.state.tab === 'sent' ? 'button is-flex is-flex-gap-sm align-center is-info' :'button is-flex is-flex-gap-sm align-center z-index' } data-tab='sent' onClick={this.openTab}>
                    <span class="icon" ><i class="fa fa-envelope-o px-3" data-tab='sent'></i></span>
                    <span class="name" data-tab='sent'>Sent</span>
                    {this.state.listMessage.length < 1 ? "" : <span className='tag is-info'>{this.state.listMessage.length}</span>}
                   </li>
                   <li className='button is-flex is-flex-gap-sm align-center'>
                   <span class="icon"><i class="fa fa-folder-o"></i></span>
                    <span class="name">Folders</span>
                   </li>
                    <li className='button is-flex is-flex-gap-sm align-center'>
                    <span class="icon"><i class="fa fa-folder-o"></i></span>
                    <span class="name">Folders</span>
                   </li>
                </ul>
            </div>
        </aside>
 <div class="column is-6 card is-flex-column is-flex-gap-md" id="message-feed">
            {/* START BOX CARD */}
 <div className='tab tab-active'>
 <div class={this.state.tab === 'inbox' ? "card is-flex-column is-flex-gap-md p-3 fade" : "hide"} data-tab='inbox'>
   {messasgeCard }
 </div>
 <div class={this.state.tab === 'sent' ? "card is-flex-column is-flex-gap-md p-3 fade" : "hide"} data-tab='sent'>
   { sentCard}
 </div>
 </div>
            {/* END BOX CARD */}
</div>

    </div>
</div>
        )
    }
}  
