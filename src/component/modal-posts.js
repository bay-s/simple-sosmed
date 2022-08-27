import React from 'react'
import Loading from './loading';
import { Link } from 'react-router-dom';
import {database,auth,storage} from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot, setDoc, query, orderBy, where, serverTimestamp} from 'firebase/firestore';

class ModalPosts extends React.Component{
constructor(){
    super()
    this.state = {
        hide:true,
        error:false,
        pesan:'',
        caption:'',
        post_image:'',
        drop:false,
        isLoad:false,
        isUpload:false,
        icons:React.createRef(),
        imgUpload:'',
        url:''
    }
}

componentDidMount(){
    window.addEventListener("dragover",function(e){
        e = e || event;
        e.preventDefault();
      },false);
      window.addEventListener("drop",function(e){
        e = e || event;
        e.preventDefault();
      },false);
}

dragItem = (e) => {
    e.preventDefault()
const icon = this.state.icons.current
 this.setState({drop:this.state.drop = true})
icon.classList.add('has-text-info')
}

exitDrag = e => {
    e.preventDefault()
    const icon = this.state.icons.current
    icon.classList.remove('has-text-info') 
}

dropItem = ev => {
    ev.preventDefault()
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
          this.setState({
            imgUpload:URL.createObjectURL(file),
            url:file.name
          });
          console.log( URL.createObjectURL(file));
          console.log(this.state.url);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
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


postLikes = (ranID) => {
  const db = collection(database,'post_likes');
  setDoc(doc(db,ranID),  {
     user_likes_id:[],
     likes_post_id:ranID
    })
    .then(() => {console.log("notif sukses")})  
    .catch((err) => {
      console.log(err);
    })

}

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
          post_tag:'',
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

    const style = {
        height:`${400}px`
    }
    return(
        <>
        <div class="modal-background"></div>
        <form onSubmit={this.Validasi}>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-centered is-size-6 is-title">Create new post</p>
              <button type='submit' className={this.state.imgUpload === '' ? 'hide' : 'modal-button has-text-info is-tittle mx-3 is-size-6' }>Post</button>
              <a href='' class="delete" aria-label="close"></a>
            </header>
<section  className={this.state.imgUpload === '' ? "modal-card-body is-flex is-flex-direction-column is-vcentered" : "hide"} draggable onDrop={this.dropItem } onDragOver={this.dragItem} onDragLeave={this.exitDrag } style={style}>

<div className='has-text-centered is-flex is-flex-direction-column is-vcentered is-flex-gap-md my-auto'>
      <div className='is-flex is-flex-direction-column'>
      <i class='fa fa-picture-o  is-size-1' aria-hidden="true" ref={this.state.icons}></i>
        <p class="modal-card-title is-size-5">Drag photos and videos here</p>
        
      </div>
<div class="file is-info is-small is-centered ">
  <label class="file-label is-flex is-flex-direction-column">
    <input class="file-input" type="file" name="image-post" onChange={this.ImageChange}/>
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-upload"></i>
      </span>
      <span class="file-label">
        Select from computer
      </span>
    </span>
  </label>
</div>
       </div> 
<div className={this.state.isLoad ? 'my-auto' : 'hide'} >
<Loading isUpload={this.state.isUpload} />
</div>
 </section>
 


<section className={this.state.imgUpload !== '' ? "columns is-multiline p-0 m-0" : "hide"}>
<div className='column is-8 p-0 m-0 image-container'> <img src={this.state.imgUpload} alt="test" /></div>
 <div className='column  p-3 has-background-white caption'>
  <div className='is-flex is-align-items-center is-flex-gap-lg'>
<figure class="image is-32x32">
  <img src="https://bulma.io/images/placeholders/256x256.png" className='is-rounded' />
</figure>
<p className='subtitle is-title'>@username</p>
  </div>
  <div className='field my-1'>
  <textarea class="textarea is-light" name='caption' placeholder="Write caption.." onChange={this.handlerChange}></textarea>
  </div>
 </div>
 </section>

</div>
          </form>
        </>
            )
}

}

export default ModalPosts;



{/* <footer class="modal-card-foot">
<button class="button is-info" disabled>Save changes</button>
<button class="button">Cancel</button>
</footer> */}