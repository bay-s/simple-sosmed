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
     isSubmit:false,
     fullname:'',
     username:'',
     password:'',
     email:'',
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
    let total_posts = this.props.total_post
    const ranID = Math.random().toString(36).substring(2,36);
    const username = this.props.name
  const db = collection(database,"post")
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
          console.log(downloadURL);
          updateDoc(docUpdate,{
            total_post:total_posts + 1
          })
          setDoc(doc(db,ranID),  {
            post_caption:this.state.caption,
            post_image:downloadURL,
            post_id:ranID,
            username:username,
            user_id:id,
            timestamp: serverTimestamp(),
            total_comment:0,
            total_likes:0
          })
        .then(() =>{
          this.setState({
            pesan:this.state.pesan = "Berhasil membuat post",
            hide:this.state.hide = true,
            error:this.state.error = false,
            isLoad:this.state.isLoad = false,
            isUpload:this.state.isUpload = true
          })
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
  
  Validasi = e => {
    e.preventDefault()
  
  
    if(this.state.url.length < 1){
      this.setState({
        pesan:this.state.pesan = "Post can`t be empty",
        error:this.state.error = true
      })
    }
  else{
    this.setState({
      isLoad:this.state.isLoad = true
    })
  console.log(this.state.isLoad);
  this.uploadImage() 
    }
  }

  render(){
    return(
    <div className="container my-fluid " >
    <div className='columns is-multiline  mx-6 is-centered is-variable is-desktop is-6-widescreen  '>
        <div className='column is-two-thirds box'>
            <div className='p-3'>
                <form className='is-flex is-flex-direction-column is-flex-gap-lg'>
<div class="field is-flex is-flex-gap-xl is-align-items-center">
<figure class="image is-48x48">
<img class="is-rounded" src={this.state.data.images === "" ? akun : this.state.data.images} />
</figure>
<form>
<div class="file is-small is-flex is-flex-direction-column is-flex-gap-sm">
<label class="label p-0 m-0">{this.state.data.username}</label>
<label class="file-label">
<input class="file-input" type="file" name="resume" />
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
</form>
</div>

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