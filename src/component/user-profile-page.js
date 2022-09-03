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


class UserProfilePage extends React.Component{
  constructor(){
    super()
    this.state = {
      data: [],
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
  await getDocs(q2).then((res) => {
    if (res) {
      console.log(res.docs);
      this.setState({
        dataPost: (this.state.dataPost = res),
        loading: (this.state.loading = false),
      });
    }
  });

  // GET FOLLOWER ID
  await getDocs(queryFollow).then((res) => {
    res.docs.map((item) => {
      const data = item.data();
      console.log(data);
      data.follower.map(f_id  => {
        if(f_id === this.props.ID) 
        {
          console.log("Tes");
          this.setState({
            follower_id: (this.state.follower_id = f_id ),
            isFollow:this.state.isFollow = true
          });
        }else{
          console.log("salah");
        }
      })
    });
  });

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
  getDocs(q).then((res) => {
    res.docs.map((item) => {
      const data = item.data();
      return this.setState({
        data: (this.state.data = data),
        total_followers: (this.state.total_followers = data.total_follower),
        total_following: (this.state.total_following = data.total_following),
      });
    });
  });

  //   GET ALL POST
  await getDocs(q2).then((res) => {
    if (res) {
      this.setState({
        dataPost: (this.state.dataPost = res),
        loading: (this.state.loading = false),
      });
    }
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

  // GET FOLLOWER ID
  await getDocs(queryFollow).then((res) => {
    res.docs.map((item) => {
      const data = item.data();
      data.follower.map(f_id  => {
        if(f_id === this.props.ID) 
        {
          this.setState({
            follower_id: (this.state.follower_id = f_id ),
            isFollow:this.state.isFollow = true
          });
        }else{
          console.log("salah");
        }
      })
    });
  });

  // OPEN SENT MESSAGE
  
}

   

followNotif = (user_id) => {
  const notif_id = user_id;
  const docUpdate = doc(database, "notifikasi", user_id);

  updateDoc(docUpdate, {
    notif: arrayUnion({
      pesan: `${this.props.user_name} Has been followed you`,
      user_name: this.props.user_name,
      user_id: notif_id,
      user_avatar: this.props.avatar,
    }),
  })
    .then(() => {
      alert("notif me senpai");
    })
    .catch((err) => {
      alert(err);
    });
};

following_profiles = (user_id) => {
  const current_user = this.props.ID;
  const docUpdate = doc(database, "user_follower", current_user);
  const user = doc(database, "user", this.props.ID);
  updateDoc(docUpdate, {
    following: arrayUnion(user_id),
  });
  updateDoc(user, {
    total_following: (this.state.total_following = +1),
  })
    .then(() => console.log("follow succes"))
    .catch((err) => {
      alert(err.message);
    });
};

follower_profiles = (user_id) => {
  const docUpdate = doc(database, "user_follower", user_id);
  const current_user = this.props.ID;
  updateDoc(docUpdate, {
    follower: arrayUnion(current_user),
  })
    .then(() => console.log("follow succes"))
    .catch((err) => {
      alert(err.message);
    });
};

follow = (e) => {
  const user_id = this.props.id;
  const is_follows = e.target.dataset.follow;
  const docUpdate = doc(database, "user", user_id);
  if (is_follows === user_id) {
    if (e.target.classList.contains("following")) {
      this.Remove(user_id);
      e.target.textContent = 'Follow'
      updateDoc(docUpdate, {
        total_follower: this.state.total_followers - 1,
      })
        .then(() => {
          alert('followsucces');
          this.setState({ hide: (this.state.hide = false) });
        })
        .catch((err) => {
          alert(err.message);
        });
      console.log("KOSONGxxx");
    } else {

      console.log("ada ASDASDAS");
      this.follower_profiles(user_id);
      this.following_profiles(user_id);
      updateDoc(docUpdate, {
        total_follower:+ 1,
      })
        .then(() => {
          alert('Follow succes');
          // this.followNotif(user_id);
          this.setState({ hide: (this.state.hide = false) });
        })
        .catch((err) => {alert(err.message);});
    }
  }
};

Remove = (user_id) => {
  const removeNotif = doc(database, "notifikasi", user_id);
  const removeFollowing = doc(database, "user_follower", this.props.ID);
  const user = doc(database, "user", this.props.ID);
  const removeFollower = doc(database, "user_follower", user_id);

  updateDoc(removeFollower, {
    follower: arrayRemove(this.props.ID),
  });
  updateDoc(removeFollowing, {
    following: arrayRemove(user_id),
  });
  updateDoc(user, {
    total_following: (this.state.total_following = -1),
  })
    .then(() => {
      alert("remove succes");
      alert(this.state.follower_id.length);
    })
    .catch((err) => {
      alert(err.message);
    });
};

displayOption = (e) => {
  const id = e.target.dataset.name;
  this.setState({option:this.state.option = id})
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

    const buttonFollow =
    this.state.isFollow ? 
    <button class="button is-link is-outlined is-title is-size-6 is-small following" data-follow={this.props.id}
    onClick={this.follow}>Following</button>   
    :       <button class="button is-link is-outlined is-title is-size-6 is-small" data-follow={this.props.id}
    onClick={this.follow}>Follow</button>
     
    const postCard = Array.isArray(this.state.dataPost.docs) ? this.state.dataPost.docs.map((post,index)=> {
      const posts = post.data()
      return <PostCard data={posts} avatar={this.state.data.images}  isLogin={this.props.isLogin} id={this.props.ID}/>
      }) : ""

  return (
<>
        {/* START TCOL 2 */}
        <div className="column is-10 box is-flex is-flex-direction-column is-flex-gap-lg">
           <h3 className="is-title is-size-4 has-text-weight-bold has-text-centered my-2">
             Profile
           </h3>
           <div className="is-flex is-justify-content-space-between is-align-items-center ">
             <div className="is-flex is-align-items-center is-flex-gap-md">
               <figure class="image is-128x128 avatar">
                 <img
                   class="is-rounded"
                   src={this.state.data.images === '' ? akun : this.state.data.images }
                   alt=""
                 />
               </figure>
               <div className="is-flex is-flex-direction-column is-flex-gap-sm">
                 <h3 className="is-title is-size-5 has-text-weight-bold">
                   {this.state.data.fullname}
                 </h3>
                 <h3 className="is-title is-size-6 has-text-weight-semibold">
                 {this.state.data.username}
                 </h3>
               </div>
             </div>
             {/* END PROFILE LEFT */}
           <div className="button-action is-flex is-flex-direction-column is-flex-gap-sm">
            {buttonFollow}
            <Link to={`/send-message/${this.props.id}`} class="button is-link is-outlined is-title is-size-6 is-small">Send Message</Link>
            </div>
           </div>
           {/* END PROFILE */}
  <div className="is-flex is-flex-direction-column is-flex-gap-sm is-align-items-start my-4">
           <nav class="level is-mobile">
   <div class="level-item has-text-centered">
     <div>
     <p class="pt-2 is-size-6 mb-2">Post</p>
       <p class="title">{this.state.data.total_post}</p>
     </div>
   </div>
   <div class="level-item has-text-centered">
     <div>
     <button class="button is-small open-following" onClick={this.openModal}>
      Following
    </button>
       <p class="title">{this.state.data.total_following}</p>
     </div>
   </div>
   <div class="level-item has-text-centered">
     <div>
     <button class="button is-small open-follower" onClick={this.openModal}>
      Follower
    </button>
       <p class="title">{this.state.data.total_follower}</p>
     </div>
   </div>
   <div class="level-item has-text-centered">
   </div>
 </nav>
           </div>
           {/* END PROFILE */}
         </div>
         {/* END COLUMN */}
         <div className="column is-10 ">
           <div class="tabs is-centered">
             <ul>
               <li class="is-active">
                 <a>
                   <span class="icon is-small">
                     <i class="fa fa-picture-o" aria-hidden="true"></i>
                   </span>
                   <span>Pictures</span>
                 </a>
               </li>
               <li>
                 <a>
                   <span class="icon is-small">
                     <i class="fa fa-video-camera" aria-hidden="true"></i>
                   </span>
                   <span>Videos</span>
                 </a>
               </li>
               <li>
                 <a>
                   <span class="icon is-small">
                     <i class="fa fa-file-text" aria-hidden="true"></i>
                   </span>
                   <span>Documents</span>
                 </a>
               </li>
             </ul>
           </div>
           <div className="columns is-multiline">
             {Array.isArray(this.state.dataPost.docs) ? postCard : <NoPost /> }
             {/* <UserPostCard /> */}
            </div> 
         </div>
         {/* END COLUMN CONTENT*/}
         
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
