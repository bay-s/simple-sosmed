import React from 'react'
import { Link, useParams} from 'react-router-dom'
import akun from '../akun.jpg'
import {database,auth} from '../firebase';
import { getAuth, deleteUser } from "firebase/auth";
import { collection, getDocs,query, where,doc, deleteDoc,getDocFromCache} from 'firebase/firestore';

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
     pesan:'',
     isSubmit:false,
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
        return this.setState({ data:this.state.data = data})  
        });
      })
    
  }


  handlerChange = (e) => {
    const {name,value} = e.target
    this.setState(prev => {
      return{
   [name]:value
      }
    })
  }
  
  ImageChange = event => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      console.log(img.name);
      this.setState({
        imgUpload: URL.createObjectURL(img),
        url:img
      });
    }
  };
  
   uploadImage = () => {
  
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
          // this.setState({saveImage:!this.state.saveImage,});
          // this.postLikes(ranID);

          updateDoc(docUpdate,{
            images:downloadURL
          })
        .then(() =>{
          this.setState({pesan:"Upload Sukses"})
        })
        .catch(err => {
        alert(err.message)
        this.setState({
          error:this.state.error = true,
          pesan:err.message
        })
        console.log(err);
        })
        });
      }
    );
    
  
  }
  

  updateProfile = (e) => {
    const id = this.props.id
    const docUpdate = doc(database,'user',id)

  if(this.state.url === ''){
    updateDoc(docUpdate,{
      username:this.state.username,
      fullname:this.state.fullname,
      biodata:this.state.biodata,
      link_website:this.state.website,
      phone:this.state.phone
     })
     .then(() =>{
       this.setState({pesan:"Upload Sukses"})
     })
     .catch(err => {
     alert(err.message)
     this.setState({
       error:this.state.error = true,
       pesan:err.message
     })
     console.log(err);
     })
  }else{
    updateDoc(docUpdate,{
      username:this.state.username,
      fullname:this.state.fullname,
      biodata:this.state.biodata,
      link_website:this.state.website,
      phone:this.state.phone,
      images:this.uploadImage() 
     })
     .then(() =>{
       this.setState({pesan:"Upload Sukses"})
       e.target.reset()
     })
     .catch(err => {
     alert(err.message)
     this.setState({
       error:this.state.error = true,
       pesan:err.message
     })
     console.log(err);
     })
  }
  }
  
  Validasi = e => {
    e.preventDefault()

    if(this.state.username.indexOf(' ') >= 0){
      this.setState({
        pesan:this.state.pesan = "Username tidak boleh menggunakan spasi",
        error:this.state.error = true
      })
      }
      else if (this.state.username.length < 6) {
        this.setState({
          pesan:this.state.pesan = "Username minimal 6 karakter",
          error:this.state.error = true
        })
      }
      else if(this.state.fullname.length < 8){
        this.setState({
          pesan:this.state.pesan = "Fullname minimal 8 karakter",
          error:this.state.error = true
      })
     }
  else{
    this.setState({
      isLoad:this.state.isLoad = true
    })
  this.updateProfile (e) 
    }
  }


  render(){
    return(
    <div className="container my-fluid " >
  <div className='columns is-multiline  mx-6 is-centered is-variable is-desktop is-6-widescreen  '>
        <div className='column is-two-thirds box '>
<div className='p-3'>
<form className='is-flex is-flex-direction-column is-flex-gap-lg' onSubmit={this.Validasi}>
<div class="field is-flex is-flex-gap-xl is-align-items-center">
<figure class="image is-48x48">
<img class="is-rounded edit-image" src={this.state.imgUpload !== '' ? this.state.imgUpload : this.state.data.images === "" ? akun : this.state.data.images}  alt="profile"/>
</figure>
<div class="file is-small is-flex is-flex-direction-column is-flex-gap-sm">
<label class="label p-0 m-0">{this.state.data.username}</label>
<label class="file-label">
<input class="file-input" type="file" name="resume" onChange={this.ImageChange}/>
<span class="file-cta">
<span class="file-icon">
<i class="fa fa-upload"></i>
</span>
<span class="file-label">
Small file…
</span>
</span>
</label>
</div>
</div>
{/* END UPLOAD INPUT */}
<div class="field">
<label class="label">Fullname</label>
<div class="control">
<input class="input  is-link has-text-dark" type="text" name='fullname' placeholder={this.state.data.fullname} />
</div>
</div>

<div class="field">
<label class="label">Username</label>
<div class="control">
<input class="input  is-link" type="text" name='username' placeholder={this.state.data.username} />
</div>
</div>

<div class="field">
<label class="label">Website Link</label>
<div class="control">
<input class="input  is-link" type="text" name='website' placeholder={this.state.data.link_website} />
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
          <input class="input is-link" type="tel" name='phone' placeholder="Your phone number" />
        </p>
      </div>
      <p class="help">Do not enter the first zero</p>
    </div>
  </div>
</div>

<div class="field">
<label class="label">Bio</label>
<textarea class="textarea is-link is-small" name='biodata' placeholder={this.state.data.biodata}></textarea>
</div>


<fieldset disabled>
<div class="field">
<label class="label">Email</label>
<div class="control">
<input class="input  is-link has-text-weiht-bold" type="email" name='email' placeholder={this.state.data.email} />
</div>
</div>
</fieldset>


<div class="field">
{this.state.isSubmit ? <button class="button is-link" title="Disabled button" disabled>Submit</button> :<button class="button is-link" title="Disabled button">Submit</button>}
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