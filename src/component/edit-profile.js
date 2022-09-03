import React from 'react'
import { Link, useParams} from 'react-router-dom'
import akun from '../akun.jpg'
import {database,storage} from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection,updateDoc,doc,query,getDocFromCache,getDocs,where} from 'firebase/firestore';

function EditProfile(props){
  const {id} = useParams()

    return(
     <EditProfileCard id={id} />
    )

}

export default EditProfile;


class EditProfileCard extends React.Component{
  constructor(){
    super()
    this.state = {
     data:[],
     error:false,
     sukses:false,
     pesan:'',
     hide:false,
     isSubmit:false,
     isUpload:false,
     fullname:'',
     username:'',
     phone:'',
     website:'',
     biodata:'',
     imgUpload:'',
     url:''
    }
  }
  
  async componentDidMount() {
        
    const db = collection(database,"user")
    const id = this.props.id;
    const q = query(db,where("uid","==" , id))
  
    // GET USER LOGIN
  getDocs(q).then(res => {
      res.docs.map(item => {
      const data = item.data()
        return this.setState({ 
          data:this.state.data = data,
          username:data.username,
          fullname:data.fullname,
          biodata:data.biodata,
          website:data.link_website,
          phone:data.phone,
        })  
        });
      })
    
  }


  handlerChange = (e) => {
    const {name,value} = e.target
    console.log(value);
    console.log(this.state.username);
    this.setState(prev => {
      return{
   [name]:value,
   isSubmit:this.state.isSubmit = true,
      }
    })
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
  

  updateProfile = () => {
    const id = this.props.id
    const docUpdate = doc(database,'user',id)

    updateDoc(docUpdate,{
      username:this.state.username,
      fullname:this.state.fullname,
      phone:this.state.phone,
      biodata:this.state.biodata,
      link_website:this.state.website
     })
     .then(() =>{
      this.setState({
        pesan:this.state.pesan = "Upload Sukses",
        sukses:true
      })
       alert("update sukses")
     })
     .catch(err => {
     alert(err.message)
     this.setState({
       error:this.state.error = true,
       pesan:err.message,
       isSubmit:this.state.isSubmit = true
     })
     })
  }
  
  Validasi = e => {
    e.preventDefault()

    if(this.state.username.indexOf(' ') >= 0){
      this.setState({
        pesan:this.state.pesan = "Username tidak boleh menggunakan spasi",
        error:this.state.error = true
      })
      }
  else{
    this.setState({
      isLoad:this.state.isLoad = true,
      isSubmit:false
    })

  this.updateProfile()
    }
  }


  render(){
    return(
    <div className="container my-fluid " >
  <div className='columns is-multiline  mx-6 is-centered is-variable is-desktop is-6-widescreen  '>
        <div className='column is-two-thirds box '>
<div className='p-3'>
<form className='my-3' onSubmit={this.uploadImage}>
<div class="field is-flex is-flex-gap-xl is-align-items-center">
<figure class="image is-48x48">
<img class="is-rounded edit-image" src={this.state.imgUpload !== '' ? this.state.imgUpload : this.state.data.images === "" ? akun : this.state.data.images}  alt="profile"/>
</figure>
<div class="file is-small is-flex is-flex-direction-column is-flex-gap-sm">
<label class="label p-0 m-0">{this.state.data.username}</label>
<label class="file-label">
<input class="file-input" type="file" name="resume" defaultValue={this.state.data.images} onChange={this.ImageChange}/>
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
{/* END UPLOAD INPUT */}
<form className='is-flex is-flex-direction-column is-flex-gap-lg' onSubmit={this.Validasi}>
<div class="field">
<label class="label">Fullname</label>
<div class="control">
<input class="input  is-link has-text-dark" type="text" name='fullname' placeholder={this.state.data.fullname} defaultValue={this.state.data.fullname} onChange={this.handlerChange}/>
</div>
</div>

<div class="field">
<label class="label">Username</label>
<div class="control">
<input class="input  is-link" type="text" name='username' placeholder={this.state.data.username}  defaultValue={this.state.data.username}  onChange={this.handlerChange}/>
</div>
</div>

<div class="field">
<label class="label">Website Link</label>
<div class="control">
<input class="input  is-link" type="text" name='website' placeholder={this.state.data.link_website} defaultValue={this.state.data.link_website} onChange={this.handlerChange}/>
</div>
</div>

<div class="field ">
<label class="label">Phone</label>
  <div class="field-body">
    <div class="field is-expanded">
      <div class="field has-addons">
        <p class="control">
          <a class="button is-static">
            +62
          </a>
        </p>
        <p class="control is-expanded">
          <input class="input is-link" type="tel" name='phone' placeholder={this.state.data.phone} defaultValue={this.state.data.phone} onChange={this.handlerChange}/>
        </p>
      </div>
      <p class="help">Do not enter the first zero</p>
    </div>
  </div>
</div>

<div class="field">
<label class="label">Bio</label>
<textarea class="textarea is-link is-small" name='biodata' placeholder={this.state.data.biodata} defaultValue={this.state.data.biodata} onChange={this.handlerChange}></textarea>
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

<div class="field">
{this.state.isSubmit ?  <button class="button is-link" title="Disabled button">Submit</button> : <button class="button is-link" title="Disabled button" disabled>Submit</button>}
</div>
                </form>
            </div>
        </div>
    </div>
</div>
    )
  }
}


// <div class="file is-small">
// <label class="file-label">
//   <input class="file-input" type="file" name="resume" />
//   <span class="file-cta">
//     <span class="file-icon">
//       <i class="fa fa-upload"></i>
//     </span>
//     <span class="file-label">
//       Small file…
//     </span>
//   </span>
// </label>
// </div>