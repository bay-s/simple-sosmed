import React, { createRef } from 'react'
import {database} from '../firebase';
import { collection, arrayUnion,getDocs, doc,where, updateDoc,query} from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import img from '../akun.jpg'
import ReplyForm from './reply-form';




function MessageDetail(props){
  const {id} = useParams()
  const ID = props.ID

  return(
      <MessageDetailCard id={id} ID={ID} name={props.name} avatar={props.avatar} />
  )
}

export default MessageDetail;

class MessageDetailCard extends React.Component{
  constructor(){
      super()
      this.state = {
         hide:true,
         listMessage:[],
         uid:'',
         loading:false,
         open:React.createRef()
      }
  }

  
  async componentDidMount(){
    const id = this.props.id
    const msg = collection(database,'private_message');
    const qMsg = query(msg, where("message_id", "==",id));
            // GET SENDER MESSAGE
            await getDocs(qMsg).then((res) => {
              res.docs.map((item) => {
                  const data = item.data();
                  console.log(data);
                  return this.setState({
                    listMessage:data,
                    loading:false
                  })

              });
            });
  }
  


  openReply = e => {
    e.preventDefault()
    const id = e.target.dataset.uid
    const open = this.state.open.current
    open.classList.toggle('open')
    this.setState({
      hide:!this.state.hide,
      uid:id
    })
  }


render(){
  const text = this.state.listMessage == null ? "" : String(this.state.listMessage.sender_text)
  const textStr = text.match(/.{1,250}/g)
console.log(this.state.listMessage );
    return(

      <div className='container my-fluid post-detail'>
    {this.state.loading ? <div className='column is-12 '> <div class="card-loader is-loading">
      <div class="image"></div>
      <div class="content-loader">
        <h2></h2>
        <p></p>
      </div>
    </div> 
    </div> : <div className='columns is-multiline is-centered mt-5'>
       <div className='column is-10  shadow p-0'>
<article class="message is-dark">
<div class="message-header is-flex justify-between">
<div className='media-left is-flex is-flex-gap-md align-center mt-2'>
<figure class="image is-32x32 avatar">
<Link to={`/profile/${this.state.listMessage.sender_id}`}><img src={this.state.listMessage.sender_avatar !== '' ? this.state.listMessage.sender_avatar : img}  className='is-rounded' /></Link>
</figure>
<div class="p-0 ">
<p class="subtitle is-6 is-title p-0 mb-1"><Link to={`/profile/`} className='has-text-white'>{this.state.listMessage.sender_name}</Link></p>
 <span className='date'>{this.state.listMessage.timestamp}</span>
</div>
</div>
 </div>
</article>
       </div>
   {/* END MESSAGE HEADER*/}
<div className='column is-10 p-0 shadow mt-4'>
<article class="message is-dark">
  <div class="message-body lh-sm">
  {textStr.map(texts => {
return <p className='subtitle is-6 p-0'>{texts}</p>
}) }
  </div>

 <div class={this.state.listMessage.images  === '' ? 'hide' : "card-image"}>
    <figure class="image is-4by3">
      <img src={this.state.listMessage.images} alt="Placeholder image" />
    </figure>
</div>

<div class={this.state.listMessage.sender_name === this.props.user_name? 'hide' : "field is-grouped is-grouped-left my-2"}>
  <p class="control">
   <button  class="button is-info is-medium is-flex align-center" data-uid={this.state.listMessage.sender_id} onClick={this.openReply}>
   <i className="fa fa-reply pt-2 px-1" aria-hidden="true"></i>
   <span> Reply</span>
   </button>
 </p>
 </div>
</article>
       </div>
       {/* END MESSAGE CONTENT */}
<div className={false ? 'hide' : 'column is-10 p-0 shadow mt-4 reply-form'} ref={this.state.open}>
 <ReplyForm id={this.props.id} ID={this.props.ID} uid={this.state.listMessage.sender_id} name={this.props.name} avatar={this.props.avatar} />
</div>       
    </div>  }
      </div> 
    )
}
}