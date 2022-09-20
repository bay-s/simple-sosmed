import React from 'react'
import { Link, useParams} from 'react-router-dom'
import akun from '../akun.jpg'
import {database,storage} from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection,updateDoc,doc,query,getDocFromCache,getDocs,where} from 'firebase/firestore';
import UploadAvatar from './profile-page-upload-avatar';

class EditModal extends React.Component{
  constructor(){
    super()
    this.state = {
     error:false,
     sukses:false,
     pesan:'',
     hide:false,
     isSubmit:false,
     isUpload:false,
     biodata:'',
    }
  }
  

  handlerChange = (e) => {
    const {name,value} = e.target
    this.setState(prev => {
      return{
   [name]:value,
   isSubmit:this.state.isSubmit = true,
      }
    })
  }

  updateProfile = () => {
    const id = this.props.id
    const docUpdate = doc(database,'user',id)
    updateDoc(docUpdate,{
      biodata:this.state.biodata,
     })
     .then(() =>{
      this.setState({
        pesan: "Upload Sukses",
        sukses:true,
        error:false
      })
       alert("update sukses")
     })
     .catch(err => {
     alert(err.message)
     this.setState({
       error:true,
       sukses:false,
       pesan:err.message,
       isSubmit:true
     })
     })
  }
  
  Validasi = e => {
    e.preventDefault()

    if(this.state.biodata.length  < 1){
      this.setState({
        pesan:"Input tidak boleh kosong",
        error:true,
        sukses:false
      })
      }else if(this.state.biodata.length < 12){
        this.setState({
          pesan:"Input atleast 10 character",
          error:true,
          sukses:false
        })
      }
  else{
    this.setState({
      isLoad:true,
      isSubmit:false,
      pesan:"",
      error:false,
      sukses:false
    })
    this.updateProfile()
    }
  }

  render(){
    return(
     <>
<div class="modal-background"></div>
{/*  */}
<div class="modal-card">
<header class="modal-card-head">
  <p class="modal-card-title">Edit Profile</p>
  <button class="delete" aria-label="close" onClick={this.props.openModal}></button>
</header>

{/* END UPLOAD INPUT */}
<section class="modal-card-body">
<form className='is-flex is-flex-direction-column is-flex-gap-lg' onSubmit={this. Validasi }>

<div class="field">
<label class="label">Write About Yourself</label>
<textarea class="textarea is-link is-small" name='biodata' placeholder={this.props.data.biodata} defaultValue={this.props.data.biodata} onChange={this.handlerChange}></textarea>
</div>


<article class={this.state.error ? "message is-danger" : 'hide'}>
  <div class="message-body">
 <i> {this.state.pesan}</i>
  </div>
</article>
<article class={this.state.sukses ? "message is-success" : 'hide'}>
  <div class="message-body">
 <i> {this.state.pesan}</i>
  </div>
</article>

<div class="field  is-flex align-end">
<span class="button is-clickable" onClick={this.props.openModal}>Cancel</span>
{this.state.isSubmit ?  <button class="button is-link" >Save</button> : <button class="button is-link" title="Disabled button" disabled>Submit</button>}
</div>
</form>
{/* END FORM */}
</section>

</div>
</>
    )
  }
}


export default EditModal;



