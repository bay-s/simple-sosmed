import React from 'react'
import {database,auth,storage} from '../firebase';
import { getAuth, deleteUser } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection,updateDoc,doc,query,getDocFromCache,getDocs,where} from 'firebase/firestore';
import banners from "../banner.jpg";
import { Link } from 'react-router-dom';
import ModalBanner from './modal-confirm-banner';

class Banner extends React.Component{
    constructor(){
        super()
        this.state = {
            images:'',
            url:'',
            hide:false,
            status:null,
            saves:true,
            banner:''
        }
    }


    componentDidMount(){ 
      const db = collection(database,"user")
      const id = this.props.ID;
      const q = query(db,where("uid","==" , id))

      // GET USER LOGIN
   getDocs(q).then(res => {
        res.docs.map(item => {
        const data = item.data()
        console.log(data);
          return this.setState({banner:this.state.banner = data.banner})  
          });
        })
      
    }

  changeBanner = (event) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      this.setState({
        images: URL.createObjectURL(img),
        url:img,
        hide:!this.state.hide
      });
    }
      }
  
uploadImage = () => {
    const ID = this.props.ID
    const docUpdate = doc(database,'user',ID)
      const spaceRef = ref(storage, `images/${this.state.url.name}`);
      const uploadTask = uploadBytesResumable(spaceRef,this.state.url);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        this.setState({status:this.state.status = progress})
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
          // this.setState({saveImage:!this.state.saveImage,});
          updateDoc(docUpdate,{banner:downloadURL})
          .then(() =>{
            alert("Change banner sukses")
            this.setState({
              saves:this.state.saves = true,
              hide:this.state.hide = false
            })
          })
          .catch(err => {
            alert(`Something wrong ${err.message}`)
            this.setState({
              saves:true,
              hide:false
            })
        })
        });
      }
    );
    
  }  

uploadBanner = (e) => {
    e.preventDefault()
    if(this.state.url.length < 1){
alert("empty")
    }else{
alert("test")
this.setState({saves:false})
this.uploadImage() 
    }
  }

 Cancel = () => {
  this.setState({
    images:'',
    url:'',
    hide:!this.state.hide
  });
 }
    render(){

 let banner =  this.state.images !== '' ? {
  backgroundImage:`url(${this.state.images})`
  } : this.state.banner === "" ? {
    backgroundImage:`url(${banners})`
    } : {
      backgroundImage:`url(${this.state.banner})`
      }

console.log(this.state.banner);
        return(
<div className="column is-10 p-0 m-0 profile-banner p-3 " style={ banner}>
<form className='is-flex is-flex-column align-end is-flex-gap-md' onSubmit={this.uploadBanner}>
  <label class="file-label is-clickable">
    <input class="file-input is-clickable" type="file" name="resume" onChange={this.changeBanner }/>
    <span class="file-icon has-background-grey is-rounded  p-5 is-clickable">
        <i class="fa fa-pencil is-bold is-size-4 has-text-white "></i>
     </span>
  </label>
<div className={this.state.hide ? 'is-flex is-align-self-flex-end align-center is-flex-gap-md' : 'hide'}>
  {!this.state.saves ? "" :  <a className='button is-small is-primary is-outlined is-bold' onClick={this.Cancel}>Cancel</a>}
   {this.state.saves ?  <button type='submit' className='button is-primary is-small is-bold'>Save</button> : <button class="button is-primary is-loading is-small" disabled>Loading</button>}
</div>
            </form>
 </div> 
        )
    }
}


export default Banner;
