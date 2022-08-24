import React from "react";
import Header from "./header";
import logo from "../default.jpg";
import ModalProfile from "./modal-edit-profile";
import { database, auth, storage } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  setDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import ModalPost from "./modal-post";
import AnimasiCard from "./animasi-card";
import UserPostCard from "./user-post-card";
import ModalImage from "./modal-detail";

class AccountPage extends React.Component {
  constructor() {
    super();
    this.state = {
      saveImage: false,
      url: "",
      modal: false,
      modalImage: false,
      akunName: "",
      akunEmail: "",
      akunUserName: "",
      akunBio: "",
      akunWebsite: "",
      akunImages: "",
      akunFollower: 0,
      akunFollowing: 0,
      akunID:"",
      dataPost: [],
      loading: true,
      totalPost: 0,
      dataDetail: []
    };
  }

  async componentDidMount() {
    const db = collection(database, "user");
    const id = this.props.id;
    const q = query(db, where("uid", "==", id));
    // GET USER
    await getDocs(q).then((res) => {
      res.docs.map((item) => {
        const data = item.data();
        return this.setState({
          akunName: (this.state.akunName = data.fullname),
          akunEmail: (this.state.akunEmail = data.email),
          akunUserName: (this.state.akunUserName = data.username),
          akunImages: (this.state.akunImages = data.images),
          akunID:this.state.akunID = data.uid
        });
      });
      console.log(this.state.akunImages.length);
    });
    
    const db1 = collection(database, "user-info");
    const q1 = query(db1, where("info_id", "==", id));
    // GET USER INFO
    await getDocs(q1).then((res) => {
      res.docs.map((item) => {
        const data = item.data();
        return this.setState({
          akunWebsite: (this.state.website = data.website),
          akunBio: (this.state.bio = data.bio),
          akunFollower: (this.state.akunFollowing = data.following),
          akunFollowing: (this.state.akunFollower = data.follower),
          totalPost: (this.state.totalPost = data.post),
        });
      });
    });

    //  GET POIST
    const db2 = collection(database, "post");
    const q2 = query(db2, where("user_post_id", "==", id));
    await getDocs(q2).then((res) => {
      this.setState({
        dataPost: (this.state.dataPost = res),
      });
    });

    const animate = Array.isArray(this.state.dataPost.docs)
      ? this.setState({ loading: (this.state.loading = false) })
      : this.setState({ loading: (this.state.loading = true) });
  }

  ImageChange = (event) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        akunImages: URL.createObjectURL(img),
        saveImage:this.state.saveImage = true,
        url: img,
      });
    }
  };
       
changeAvatar = (e) => {
    e.preventDefault();
    this.setState({saveImage:this.state.saveImage = false})
    const id = this.props.id
    const db = collection(database, "user");
    const docUpdate = doc(database, "user", id);
    // UPDATE PROFILE IMAGE
    const spaceRef = ref(storage, `images/${this.state.url.name}`);
    const uploadTask = uploadBytesResumable(spaceRef, this.state.url);
     if(this.state.url.length === 0){
    console.log("kosong");
     }else{
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            updateDoc(docUpdate, {
             images:downloadURL
          })
          });
        }
      );
     }
  
  };

  modalForm = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  removeModal = (e) => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  };

  removeModalPost = (e) => {
    e.preventDefault();
    this.setState({
      modalImage: !this.state.modalImage
    });
  };

  modalImages = async (e) => {
    e.preventDefault();
    this.setState({ modalImage: !this.state.modalImage });
    const src = e.target.src;
    const db2 = collection(database, "post");
    const q2 = query(db2, where("post_image", "==", src));
    await getDocs(q2).then((res) => {
      res.docs.map((item) => {
        const data = item.data();
        console.log(data);
        return this.setState({
          dataDetail: (this.state.dataDetail = data),
        });
      });
    });
  };

  logout = (e) => {
    e.preventDefault()
    auth.signOut();
  }
  
  render() {
    const postCard = Array.isArray(this.state.dataPost.docs)
      ? this.state.dataPost.docs.map((post) => {
          const posts = post.data();
          return (
            <UserPostCard
              openModal={this.modalImages}
              imeji={this.state.akunImages}
              data={posts}
            />
          );
        })
      : "";

   
    return (
      <>
        {/* <Header
          openModal={this.modalForm}
          logout={this.logout}
          name={this.state.akunUserName}
        /> */}
        <div className="user-container">
          <div className="profile">
            <div className="image-wrap">
              <img
                src={
                  this.state.akunImages.length < 1
                    ? logo
                    : this.state.akunImages
                }
              />
            </div>
            <div className="profile-list">
              <div className="user-list-name">
                <h3 className="title">{this.state.akunUserName}</h3>
                <ul>
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="edit"
                      onClick={this.modalForm}
                    >
                      Edit Profile
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="user-post-info">
                <li>
                  <span>{this.state.totalPost} posts</span>
                </li>
                <li>
                  <a href="/#">{this.state.akunFollower} Follower</a>
                </li>
                <li>
                  <a href="/#">{this.state.akunFollowing} Followwing</a>
                </li>
              </ul>
              <div className="desc">
                <h4 className="username">{this.state.akunName}</h4>
                <p className="biodata">{this.state.akunBio}</p>
                <a href={`https://${this.state.akunWebsite}`}>
                  {this.state.akunWebsite}
                </a>
              </div>
            </div>
          </div>

          <div className="user-post">
            <ul className="post-title">
              <li>
                <i class="fa fa-camera" aria-hidden="true"></i>
                <a href="/#">posts</a>
              </li>
              <li>
                <i class="fa fa-play-circle-o" aria-hidden="true"></i>
                <a href="/#">Videos</a>
              </li>
              <li>
                <i class="fa fa-tags" aria-hidden="true"></i>
                <a href="javascript:void(0)">Tagged</a>
              </li>
            </ul>

            {this.state.loading ? <AnimasiCard /> : postCard}

            <div
              className={this.state.modalImage ? "modals" : "modal-container"}
            >
              {this.state.modalImage ? (
                <ModalImage
                  dataModal={this.state.dataDetail}
                  name={this.state.akunUserName}
                  image={this.state.akunImages}
                  id={this.props.id}
                  userOnline={this.props.name}
                />
              ) : (
                ""
              )}
              <div className={this.state.modalImage ? "close" : "hide"}>
                <i
                  class="fa fa-times"
                  aria-hidden="true"
                  onClick={this.removeModalPost}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div
          className={this.state.modal ? "modals" : "modal-container"}
     
        >
          {this.state.modal ? (
            <ModalProfile
              username={this.state.akunUserName}
              name={this.state.akunName}
              images={this.state.akunImages}
              changeAvatar ={this.changeAvatar}
              changeImg={this.ImageChange}
              refs={this.state.refs}
              id={this.state.akunID}
              logout={this.logout}
              save={this.state.saveImage}
              removeModal={this.removeModal}
            />
          ) : (
            ""
          )}
<div className={this.state.modal ? 'close' : "hide"}>
<i class="fa fa-times" aria-hidden="true" onClick={this.removeModal}></i>
</div>
        </div>
      </>
    );
  }
}

export default AccountPage;
