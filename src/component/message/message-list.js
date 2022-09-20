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
    <MessageListCard id={id} ID={ID} name={props.name} avatar={props.avatar}/>
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
        const test =query(list_message, where("owner_id", "==",id)); 
      
                // GET SENDER MESSAGE
                await getDocs(qMsg ).then((res) => {
                  res.docs.map((item) => {
                    const data = item.data();
                    console.log(data);
                    return this.setState({
                      listMessage:data.private_message,
                      listSent:data.sent_message
                    });
                  });
                });
      
                await getDocs(test).then((res) => {
                  res.docs.map((item) => {
                    const data = item.data();
                    console.log(data);
                  });
                });
      }
      
      async componentDidUpdate(){
        const list_message = collection(database,'private_message');
        const id = this.props.ID
        const qMsg = query(list_message, where("uid", "==",id));
      
                // GET SENDER MESSAGE
                await getDocs(qMsg ).then((res) => {
                  res.docs.map((item) => {
                    const data = item.data();
                    console.log(data);
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
this.setState({tab:this.state.tab = tabs})

}
      
    render(){
        console.log(this.state.listMessage);
     const messasgeCard = this.state.listMessage.length < 1 ? "" : this.state.listMessage.map((msg,index) => {return <MessageCard msg={msg} key={index} index={index}/>});
     const sentCard = this.state.listSent.length < 1 ? "" : this.state.listSent.map((msg,index) => { return <SentCard msg={msg} key={index} index={index}/>});  

        return(
            <div className='container my-fluid my-3'>
    <div class="columns" id="mail-app">
        <aside class="column is-2 shadow h-100 p-0">
            <div>
                <ul class="is-flex is-flex-column main">
                    <a href="#" class="button is-flex is-flex-gap-sm align-center" data-tab='inbox' onClick={this.openTab}>
                    <i class="fa fa-inbox " data-tab='inbox' onClick={this.openTab}></i>
                     <span> Inbox</span>
                    {this.state.listMessage.length < 1 ? "" : <span className='tag is-info'>{this.state.listMessage.length}</span>}
                    </a>
                    <a href="#" class="button is-flex is-flex-gap-sm align-center" data-tab='sent' onClick={this.openTab}>
                    <i class="fa fa-envelope-o px-3" data-tab='sent' onClick={this.openTab}></i>
                     <spam>Sent</spam>
                    {this.state.listSent.length < 1 ? "" : <span className='tag is-info'> {this.state.listSent.length}</span>}
                    </a>
                    <a href="#" class="button">
                    <span class="icon"><i class="fa fa-star"></i></span>
                    <span class="name">Starred</span>
                    </a>
                    <a href="#" class="button">
                    <span class="icon"><i class="fa fa-folder-o"></i></span>
                    <span class="name">Folders</span>
                    </a>
                </ul>
            </div>
        </aside>
        <div class="column is-6 card is-flex-column is-flex-gap-md" id="message-feed">
            <div class="action-buttons is-flex">
                <div class="control is-grouped">
                    <a class="button is-small"><i class="fa fa-chevron-down"></i></a>
                    <a class="button is-small"><i class="fa fa-refresh"></i></a>
                </div>
                <div class="control is-grouped">
                    <a class="button is-small"><i class="fa fa-inbox"></i></a>
                    <a class="button is-small"><i class="fa fa-exclamation-circle"></i></a>
                    <a class="button is-small"><i class="fa fa-trash-o"></i></a>
                </div>
                <div class="control is-grouped">
                    <a class="button is-small"><i class="fa fa-folder"></i></a>
                    <a class="button is-small"><i class="fa fa-tag"></i></a>
                </div>
            </div>
            {/* START BOX CARD */}
 <div className='tab'>
 <div class={this.state.tab === 'inbox' ? "card is-flex-column is-flex-gap-md" : "hide"} data-tab='inbox'>
   {messasgeCard }
 </div>
 <div class={this.state.tab === 'sent' ? "card is-flex-column is-flex-gap-md p-3" : "hide"}data-tab='sent'>
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
