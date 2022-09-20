import React from 'react'
import akun from '../akun.jpg'
import {database,storage} from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { collection,updateDoc,doc} from 'firebase/firestore';



class UploadAvatar extends React.Component{
    constructor(){
        super()
        this.state = {
         hide:false,
         isSubmit:false,
         isUpload:false,
         website:'',
         imgUpload:'',
         url:''
        }
      }

    ImageChange = event => {
        console.log(event.target.files);
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            imgUpload: URL.createObjectURL(img),
            url:img,
            isUpload:true,
            hide:this.state.hide = true
          });
          console.log(this.state.hide);
        }
      };
      
       uploadImage = (e) => {
      e.preventDefault()
      this.setState({
        isUpload:this.state.isUpload = false,
        hide:this.state.hide = true
      })
        const id = this.props.id
        const docUpdate = doc(database,'user',id)
      
          const spaceRef = ref(storage, `images/${this.state.url.name}`);
          const uploadTask = uploadBytesResumable(spaceRef,this.state.url);
          uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
         
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
    
              updateDoc(docUpdate,{
              images:downloadURL
               })
               .then(() =>{
                this.setState({
                  pesan:this.state.pesan = "Upload Sukses",
                  sukses:true,
                  hide:this.state.hide = false
                })
                 alert("update sukses")
               })
               .catch(err => {
               alert(err.message)
               this.setState({
                 error:this.state.error = true,
                 pesan:err.message,
                 isUpload:this.state.isUpload = true,
                 hide:this.state.hide = false
               })
               })
            });
          }
        );
        
      
      }
      

    render(){

        return(
<form className='my-3' onSubmit={this.uploadImage}>
<div class="field is-flex is-flex-gap-xl is-align-items-center">
<figure class="image is-48x48">
<img class="is-rounded edit-image" src={this.state.imgUpload !== '' ? this.state.imgUpload : this.props.data.images === "" ? akun : this.props.data.images}  alt="profile"/>
</figure>
<div class="file is-small is-flex is-flex-direction-column is-flex-gap-sm">
<label class="label p-0 m-0">{this.props.data.username}</label>
<label class="file-label">
<input class="file-input" type="file" name="resume" defaultValue={this.props.data.images} onChange={this.ImageChange}/>
<span class="file-cta">
<span class="file-icon">
<i class="fa fa-upload"></i>
</span>
<span class="file-label">
Small file…
</span>
</span>
</label>
<div className={this.state.hide ? "" : 'hide'} >
{this.state.isUpload ?  <button type='submit' class="button is-info is-small" >Save</button> : <button class="button is-link  is-loading is-small" disabled>Loading</button>}
</div>
</div>
</div>
</form>
        )

    }
}

export default  UploadAvatar;