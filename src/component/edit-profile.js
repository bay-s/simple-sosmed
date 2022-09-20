import React from 'react'
import { Link, useParams} from 'react-router-dom'
import akun from '../akun.jpg'
import {database,storage} from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection,updateDoc,doc,query,getDocFromCache,getDocs,where} from 'firebase/firestore';
import UploadAvatar from './profile-page-upload-avatar';

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
     phone:'0',
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
  


  updateProfile = () => {
    const id = this.props.id
    const docUpdate = doc(database,'user',id)

    updateDoc(docUpdate,{
      username:this.state.username,
      fullname:this.state.fullname,
      phone:`0${this.state.phone}`,
      biodata:this.state.biodata,
      link_website:this.state.website
     })
     .then(() =>{
      this.setState({
        pesan:"Upload Sukses",
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
    if(this.state.username.indexOf(' ') >= 0){
      this.setState({
        pesan:"Username tidak boleh menggunakan spasi",
        error:true
      })
      }
  else{
    this.setState({
      isLoad:true,
      isSubmit:false,
      pesan:''
    })

  this.updateProfile()
    }
  }

  isValidUrl = urlString => {
    let url;
    try { 
          url =new URL(urlString); 
      }
      catch(e){ 
        return false; 
      }
      return url.protocol === "http:" || url.protocol === "https:";
  }
 
  render(){
    return(
    <div className="container my-fluid " >
  <div className='columns is-multiline  mx-6 is-centered'>
        <div className='column is-two-thirds box '>
<div className='p-3'>
<UploadAvatar id={this.props.id} data={this.state.data}/>
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

<div class="field">
<label class="label">Job Title</label>
<div class="control">
<input class="input  is-link" type="text" name='job' placeholder={this.state.data.job_title} defaultValue={this.state.data.job_title} onChange={this.handlerChange}/>
</div>
</div>

<div class="field ">
<label class="label">Phone</label>
  <div class="field-body">
    <div class="field is-expanded">
      <div class="field has-addons">
        <p class="control">
          <a class="button is-static ">
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
