import React from "react";
import banners from "../banner.jpg";
import akun from '../akun.jpg'
import {database} from '../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import PostCard from './post-card';
import { Link } from "react-router-dom";
import NoPost from "./no-post";
import ModalFollower from "./modal-follower";
import ModalFollowing from "./modal-following";
import ProfilePageAvatar from './profile-page-avatar';
import UserPageContentLeft from "./user-profile-page-content-left";
import UserPageContentRight from "./user-profile-page-content-right";
import UserProfileAvatarRight from "./user-profile-page-avatar-right";


class UserProfilePage extends React.Component{
  constructor(){
    super()
    this.state = {
      data: [],
      skills:'',
      option:'POST',
      modal: false,
      dataPost: [],
      loading: true,
      total_followers: null,
      total_following: null,
      follower_id: [],
      follower:[],
      following:[],
      isFollow:false,
      url:''
    }
}

async componentDidMount() {
  const db = collection(database, "user");
  const post = collection(database, "post");
  const id = this.props.id;
  const follower = collection(database, "user_follower");
  const q = query(db, where("uid", "==", id));
  const q2 = query(post, where("user_id", "==", id));
  const queryFollow = query(follower, where("uid", "==", id));

  // GET USER
  getDocs(q).then((res) => {
    res.docs.map((item) => {
      const data = item.data();
      return this.setState({
        data: (this.state.data = data),
        skills:data.skills,
        total_followers: (this.state.total_followers = data.total_follower),
        total_following: (this.state.total_following = data.total_following),
      });
    });
  });

             // GET FOLLOWER
             await getDocs(queryFollow).then(res => {
              res.docs.map(item => {
                const data = item.data()
                this.setState({
                  follower:this.state.follower = data.follower,
                  following:this.state.following = data.following
                })
                  });
                })


  //   GET ALL POST
     await getDocs(q2).then(res => {
          if (res) {
            const dataJson = JSON.stringify(res);
            const saveToLocal = localStorage.setItem("user_post",dataJson )
              this.setState({ 
                  dataPost:this.state.dataPost = res,
                  loading:this.state. loading = false
                 })  
              }
            })

}

async componentDidUpdate() {
  const db = collection(database, "user");
  const post = collection(database, "post");
  const id = this.props.id;
  const q = query(db, where("uid", "==", id));
  const q2 = query(post, where("user_id", "==", id));
  const follower = collection(database, "user_follower");
  const queryFollow = query(follower, where("uid", "==", id));

  // GET USER
  // getDocs(q).then((res) => {
  //   res.docs.map((item) => {
  //     const data = item.data();
  //     return this.setState({
  //       data: (this.state.data = data),
  //       total_followers: (this.state.total_followers = data.total_follower),
  //       total_following: (this.state.total_following = data.total_following),
  //     });
  //   });
  // });

  //   GET ALL POST
  // await getDocs(q2).then((res) => {
  //   if (res) {

  //     this.setState({
  //       dataPost: (this.state.dataPost = res),
  //       loading: (this.state.loading = false),
  //     });
  //   }
  // });

               // GET FOLLOWER
              //  await getDocs(queryFollow).then(res => {
              //   res.docs.map(item => {
              //     const data = item.data()
              //     this.setState({
              //       follower:this.state.follower = data.follower,
              //       following:this.state.following = data.following
              //     })
              //       });
              //     })

}


displayOption = (e) => {
  const id = e.target.dataset.name;
  this.setState({option:id})

}


openModal = e  => {
  e.preventDefault()
  console.log(e.target);
if(e.target.classList.contains('open-delete')){
  this.setState({modalDelete:!this.state.modalDelete})
}if(e.target.classList.contains('open-following')){
  this.setState({ modalFollowing:!this.state.modalFollowing})
}if(e.target.classList.contains('open-follower')){
  this.setState({modalFollower:!this.state.modalFollower})
}
}

closeModal = e  => {
  e.preventDefault()
  this.setState({
    modalFollower:this.state.modalFollowing = false,
    modalFollowing:this.state.modalFollowing = false,
    modalDelete:this.state.modalDelete = false
  })
}
  render(){
  
    // const postCard = Array.isArray(this.state.dataPost.docs) ? this.state.dataPost.docs.map((post,index)=> {
    //   const posts = post.data()
    //   return <PostCard data={posts} avatar={this.state.data.images}  isLogin={this.props.isLogin} id={this.props.ID}/>
    //   }) : ""
      const skills = this.state.skills ==='' ? "" : this.state.skills.split(',');

  return (
<>
<div className="column is-10 box is-flex align-center justify-between ">
<ProfilePageAvatar data={this.state.data} openModal={this.openModal} />
 {/* END LEFT PROFILE */}
<UserProfileAvatarRight id={this.props.id} ID={this.props.ID} data={this.state.data}/>
{/* END RIGHT PROFILE */}
</div>
{/* END AVATAR */}
<div className='column is-10 p-0 m-0'>
    <div className='columns is-multiline'>
<UserPageContentLeft data={this.state.data} isLogin={this.props.isLogin} ID={this.props.ID} dataPost={this.state.dataPost.docs}/>       
  {/* END COLUMN LEFT */}
<UserPageContentRight skills={this.state.skills} openModalSkills={this.openModalSkills} data={this.state.data}/>   
   {/* END COLUMN RIGHT */}
    </div>
    {/* END COLUMNS INNER */}
</div>
{/* END CONTAINER */}

          {/* MODAL FOLLOWER */}
          <div className={this.state.modalFollowing ? 'modal is-active' : 'modal'}>
 <div class="modal-background"></div>
 <ModalFollowing closeModal={this.closeModal} followClick={this.follow} id={this.props.id} isFollow={this.state.isFollow} following={this.state.following}/>
 <button class="modal-close is-large close-following" aria-label="close"  onClick={this.closeModal }></button>
 </div>
 {/* MODAL FOLLOWING */}
 <div className={this.state.modalFollower ? 'modal is-active' : 'modal'}>
 <div class="modal-background"></div>
 <ModalFollower closeModal={this.closeModal} followClick={this.follow} id={this.props.id} isFollow={this.state.isFollow} follower={this.state.follower}/>
 <button class="modal-close is-large close-follower" aria-label="close"  onClick={this.closeModal }></button>
 </div>

         </>
  );
}
}

export default  UserProfilePage;
