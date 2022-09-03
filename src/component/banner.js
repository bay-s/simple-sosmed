import React from 'react'
import {database,auth,storage} from '../firebase';
import { getAuth, deleteUser } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection,updateDoc,doc,query,getDocFromCache,getDocs,where} from 'firebase/firestore';
import banners from "../banner.jpg";
import { Link } from 'react-router-dom';

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
              saves:this.state.saves = true,
              hide:this.state.hide = false
            })
        })
        });
      }
    );
    
  }  

  uploadBanner = (e) => {
    e.preventDefault()
    alert("test")
    if(this.state.url.length < 1){
alert("empty")
    }else{
alert("test")
this.setState({saves:this.state.saves = false})
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

      let banner;
        const process = {
          width:`${this.state.status}%`
        }
    if(this.state.banner.length > 0){
      banner =  {
        backgroundImage:`url(${this.state.banner})`
      }
      console.log("test");
    }else if(this.state.images.length > 1){
      banner = {
        backgroundImage:`url(${this.state.images})`
      }
    }else{
banner =  {
  backgroundImage:`url(${banners})`
}
    }
        // style={this.state.banner.length > 0 ? banner :
        //   this.state.images.length > 0 ? bannerBG : normal
        //  }
        return(
 <div className="column is-10 p-0 m-0 profile-banner p-3 py-5" style={banner}>
 <div className='upload-photoz'>
            <form className='form' onSubmit={this.uploadBanner}>
            <label htmlFor="upload-photo" className='upload-photos'>
             <span className='has-text-white is-title'>Change Banner</span>
             <i className="fa fa-pencil-square-o has-text-white" aria-hidden="true"></i>
             </label>
             <input type="file" name="photos" id="upload-photo"  onChange={this.changeBanner}/>
             <div className={this.state.hide ? 'button-container' : 'hide' }>
                <a className='hvr-sweep-to-right cancels' onClick={this.Cancel}>Cancel</a>
                {this.state.saves ?  <button type='submit' className='hvr-sweep-to-right'>Save</button> : <button className='disabled' disabled>Save</button> }
             </div>
<div class={this.state.status != null ? 'progress' : 'hide'}>
  <div class="color" style={process}></div>
</div>
            </form>
          </div>
 </div> 
        )
    }
}


export default Banner;




//  <div className='columns is-multiline '>
//  <div className='column is-flex justify-between'>
// <div className='is-flex align-center is-flex-gap-lg'>
// <figure class="image is-128x128 avatar">
// <img class="" src="https://bulma.io/images/placeholders/128x128.png" />
// </figure>
// <div className="button-action is-flex is-flex-direction-column is-flex-gap-sm">
// <Link to={``} class="button is-outlined is-title is-small has-text-info"><i class="fa fa-cog is-size-6 mx-3" aria-hidden="true"></i> Edit Profile</Link>
// <button class="button  is-outlined is-title is-small has-text-danger" ><i class="fa fa-trash is-size-6 mx-3" aria-hidden="true" ></i>Delete Account</button>
// </div>
//    </div>
//    <div class="file is-info has-name is-boxed">
// <label class="file-label">
//  <input class="file-input" type="file" name="resume" />
//  <span class="file-cta">
//    <span class="file-icon">
//    <i className="fa fa-pencil-square-o has-text-white" aria-hidden="true"></i>
//    </span>
//    <span class="file-label">
//      Danger file…
//    </span>
//  </span>
//  <span class="file-name has-text-white text-is-stroke">
//    Screen Shot 2017-07-29 at 15.54.25.png
//  </span>
// </label>
// </div>
//  </div>
// </div>