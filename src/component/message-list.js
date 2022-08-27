import React from 'react'
import { Link, useParams } from 'react-router-dom'


function MessageList(props){
  const {id} = useParams();
  const ID = props.ID

  return(
   <MessageListCard id={id} ID={ID} name={props.name} avatar={props.avatar}/>
  )
}


export default MessageList;

class MessageListCard  extends React.Component{
  constructor(){
    super()
    this.state = {
     listMessage:[],
     listSent:[],
     card:'Inbox'
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


displayListMessage = e => {
  e.preventDefault()
 const cards = e.target.dataset.card
 this.setState({card:this.state.card = cards})

}

render(){

  const messasgeCard = this.state.listMessage.length < 1 ? "" : this.state.listMessage.map((msg,index) => {return <MessageCard msg={msg} key={index} index={index}/>});

  const sentCard = this.state. listSent.length < 1 ? "" : this.state.listSent.map((msg,index) => { return <SentCard msg={msg} key={index} index={index}/>});

    return(
     <div className='container my-fluid post-detail'>
       <div className='columns is-centered mt-5'>
       <div className='column is-2 p-0 shadow '>
  <ul className='is-flex is-flex-column  '>
    <li class="border-butt py-2 px-5">
      <a className='is-flex is-flex-gap-md align-center has-text-dark'>
        <span class="icon"><i class="fa fa-inbox is-bold" aria-hidden="true"></i></span>
        <span className='subtitle is-title is-6'>Inbox</span>
      </a>
    </li>
    <li className='p-2 px-5'>
    <a className='is-flex is-flex-gap-md align-center has-text-dark'>
        <span class="icon"><i class="fa fa-paper-plane is-bold" aria-hidden="true"></i></span>
        <span className='subtitle is-title is-6'>Sent</span>
      </a>
    </li>
  </ul>
       </div>
       {/*END COLUMN TABS  */}
<div className='column is-8 shadow p-0 is-flex is-flex-column'>
<div class="is-flex is-flex-column p-0">
{messasgeCard}
</div>
{/* END MESSAGE LIST */}
        </div>
       </div>
     </div>
    )
}
}

