import React from 'react'
import { Link } from 'react-router-dom';
import {database,auth,storage} from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot, setDoc, query, orderBy, where} from 'firebase/firestore';
import logo from '../default.jpg'

class ModalPost extends React.Component{
constructor(){
    super()
    this.state = {
        akunImages:'',
        avatar:'',
        postImage:'',
        caption:'',
        akunUsername:'',
        url:''
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
      this.setState({
        akunImages: URL.createObjectURL(img),
        url:img
      });
    }
  };

 uploadImage= (e) => {
  e.preventDefault()
  const id = this.props.id
  let total_post = this.props.Post
  const ranID = (Math.random() + 1).toString(36).substring(1);
const db = collection(database,"post")
if (this.state.caption.length < 20) {
    alert("CAPTION TOO SHORT")
}else{
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
        const docUpdate = doc(database,'user-info',id)
        updateDoc(docUpdate,{
          post:total_post + 1
        })
        addDoc(db , {
            post_image:downloadURL,
            caption:this.state.caption,
            post_id:ranID,
            username:this.props.username,
            user_image:this.state.avatar,
            user_post_id:id
          })
        .then(() =>{
          alert("add post sukses")
          window.location.reload()
        })
        .catch(err => {
      alert(err.message)
        })
      });
    }
  );
  
}
}

render(){
    return(
        <>
                <div className='new-post'>
                    <h4 className='title'>Create new post</h4>
                    <div className='new-post-inner'>
                    <form className='form-post' onSubmit={this.uploadImage}>
                    <div className={this.state.akunImages.length < 1  ? 'hide' : 'image-holder' }>
                    <img src={this.state.akunImages} />
                        </div>
                    <div className={this.state.akunImages.length < 1  ? 'photo-upload' : 'hide' }>
                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                    <label htmlFor="upload-photos" className='upload-photos'>Select from computer</label>
                    <input type="file" name="photos" id="upload-photos" onChange={this.ImageChange}/>
                    </div>
                    <div className='add-caption'>
        <div className='judul'>
        <div className='judul-left'>
        <img src={this.props.images.length < 1 ? logo : this.props.images} />
            <h3 className='name'>
            <Link to={`/account-detail/${this.props.userName}`}>{this.props.userName}</Link>
            </h3>
        </div>               
        <textarea className='textarea' name='caption' placeholder='Write Caption' onChange={this.handlerChange}></textarea>
        </div>
        <div className='button-post'>
        <a href='#0' className='cancel' onClick={this.props.removeModal}>Cancel</a>
        <button type='submit' className='save' >Done</button>
        </div>
                    </div> 
                    </form>
                    </div>
                    {/* <-- END NEW POST INNER--> */}
                    </div>
                    {/* <-- END NEW POST --> */}
        </>
                        )
}

}

export default ModalPost;


