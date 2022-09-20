import React from 'react'
import { render } from 'vue'
import {database,storage} from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection,setDoc, arrayUnion,getDocs, doc,where, updateDoc,query, addDoc} from 'firebase/firestore';
import { Link } from 'react-router-dom';

class SendMessageForms extends React.Component{
    constructor(){
        super()
        this.state = {
            message:'',
            images:'',
            url:'',
            pesan:'',
            error:false,
            status:null,
            hide:false,
            sukses:false,
            submit:false
        }
    }

    handlerChange = (e) => {
        const {name,value} = e.target
        console.log(value);
        const check = value.length > 1 ? this.setState({hide:true}) :  this.setState({hide:false})
        this.setState(prev => {
          return{
       [name]:value
          }
        })

      }
    
      ImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({url:img});
        }
      };

uploadImage = (e) => {
    const spaceRef = ref(storage, `images/${this.state.url.name}`);
    const uploadTask = uploadBytesResumable(spaceRef,this.state.url);
    const docUpdate = doc(database,'user',this.props.id)

  uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    this.setState({ status:progress})
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  alert(error.message)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      let url = '';
      // const ranID = Math.random().toString(36).substring(2,36);
      const urlCheck = this.state.url === '' ?  url = '' :  url = downloadURL
      this.sendMessages(url)
      // this.createMessages(ranID,url)
    });
  }
);

      }
    
    sendMessages = (url) => {
      const ranID = Math.random().toString(36).substring(2,36);
        const docUpdate = doc(database,'user',this.props.id)
        updateDoc(docUpdate,{
          private_message:arrayUnion({
              sender_name:this.props.dataUser.username,
              sender_avatar:this.props.dataUser.images,
              sender_id:this.props.dataUser.uid,
              sender_text:this.state.message,
              message_id:ranID,
              images:url,
              timestamp:this.timeStamp()
            })
      })
      .then(() =>{
        this.createReply(ranID,url)
        this.messageSent(ranID,url)
        // this.messageNotif()
        this.createMessage(ranID,url)
        alert("sukses")
        this.setState({
          pesan:"Message sent",
          error:false,
          sukses:true,
          submit:false,
          url:'',
          message:''
      })
      // window.location.replace(`/account/${this.props.id}`);
      })
      .catch(err => {
        this.setState({
          pesan:JSON.stringify(err),
          error:true
        })
        alert(err)
      })
    }
    
    messageSent = (ranID,url) => {
      const sentMessage = doc(database,'user',this.props.dataUser.uid)
      updateDoc(sentMessage,{
        sent_message:arrayUnion({
          sender_name:this.props.dataUser.username,
          sender_avatar:this.props.dataUser.images,
          sender_id:this.props.dataUser.uid,
          sender_text:this.state.message,
          message_id:ranID,
          images:url,
          timestamp:this.timeStamp()
       })
      })
    }
    
    createReply = (ranID) => {
      const db = collection(database,'reply_message');
      const user_id = this.props.ID
      setDoc(doc(db,ranID),  {
           user_reply:[],
           msg_reply_id:ranID
        })
        .then(() => {alert("notif sukses")})  
        .catch((err) => {
        alert(err);
        })
    }
    
    createMessage  = (ranID,url) => {
      const db = collection(database,'private_message')
      setDoc(doc(db,ranID), {
        sender_name:this.props.dataUser.username,
        sender_avatar:this.props.dataUser.images,
        sender_id:this.props.dataUser.uid,
        sender_text:this.state.message,
        message_id:ranID,
        images:url,
        timestamp:this.timeStamp()
      })
    }
    
    
    createMessages  = (ranID,url) => {
      const db = collection(database,'private_message')
      setDoc(doc(db,ranID), {
           sender_message:[
            {
                sender_name:this.props.dataUser.username,
                sender_avatar:this.props.dataUser.images,
                sender_id:this.props.dataUser.uid,
                sender_text:this.state.message,
                message_id:ranID,
                images:url,
                timestamp:this.timeStamp()
            }
           ],
           reply_message:[],
           message_from:this.props.dataUser.uid
        })
        .then(() => {alert("notif sukses")})  
        .catch((err) => {
        alert(err);
        })
    }
    
    messageNotif = () => {
      const notif_id =  this.props.id
      const docUpdate = doc(database,'notifikasi',notif_id ) // ADD NOTIF
    
      updateDoc(docUpdate,{
                  notif:arrayUnion({
                      pesan:`Message from ${this.props.dataUser.username}`,
                      user_name:this.props.dataUser.username,
                      user_id:this.props.ID,
                      user_avatar:this.props.dataUser.images
                    })
            })
      .then(() => {alert("notif me senpai")})
      .catch((err) => {alert(err)}); 
    
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
    
    
    Validasi = e => {
        e.preventDefault()
    if(this.state.message.length < 6){
        this.setState({
          pesan:"Messages atleast 6 character",
          error:true
        })
    }
    else{
this.setState({submit:false})
this.uploadImage()
      }
    
      }
   
    render(){

        return(
<form className='is-flex is-flex-column is-flex-gap-md p-5' onSubmit={this.Validasi}>
<h5 className='title is-title is-3 '>Send Message</h5>
 <div class="is-flex align-center mb-5 is-flex-gap-md">
     <span className='has-text-dark is-title'>Send message to</span>
     <Link to={`/profile/${this.props.dataUser.uid}`} className='p-0 m-0'>{this.props.dataUser.username}</Link>
</div>

<div class="field">
<label class="label is-title">Message</label>
  <div class="control">
    <textarea class="textarea is-medium  is-info" name='message' onChange={this.handlerChange}></textarea>
  </div>
</div>

<div class="file has-name is-boxed is-info">
  <label class="file-label">
    <input class="file-input" type="file" name="photos"  onChange={this.ImageChange}/>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-camera"></i>
      </span>
      <span class="file-label">
        Choose a file…
      </span>
    </span>
    <span class="file-name">
    { this.state.url.name}
    </span>
  </label>
</div>

<article class={this.state.error ? "message is-danger" : 'hide'}>
  <div class="message-body is-italic">
  {this.state.pesan}
  </div>
</article>
<article class={this.state.sukses ? "message is-success" : 'hide'}>
  <div class="message-body is-italic">
{this.state.pesan}
  </div>
</article>

<div class="field is-grouped is-grouped-right">
  <p class="control">
  {this.state.hide ? <button type='submit' class="button is-info is-medium" >
      Submit
    </button> : <button type='submit' class="button is-info is-medium" disabled>
      Submit
    </button> }
  </p>
</div>
     </form>
        )
    }
}




export default SendMessageForms;
