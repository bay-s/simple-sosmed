import React from 'react'
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

class ButtonFollow extends React.Component{
    constructor(){
        super()
        this.state = {
        isFollow:false,
        follower_id:[],
        data:[],
        total_followers: null,
        total_following: null,
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
                  })
  
  
    //   GET ALL POST
    await getDocs(q2).then((res) => {
      if (res) {
        console.log(res);
        this.setState({
          dataPost: (this.state.dataPost = res),
          loading: (this.state.loading = false),
        });
      }
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
                    data.follower.map(f_id  => {
                      if(f_id === this.props.ID) 
                      {     
                        this.setState({
                          follower_id: (this.state.follower_id = f_id ),
                          isFollow:this.state.isFollow = true
                        });
                      }else{
                  
                      }
                    })
                      });
                    })
  
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
          total_follower:this.state.total_followers - 1,
        })
          .then(() => {
            alert('followsucces');
            this.setState({ hide:false });
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
  
  check = e => {
    e.preventDefault()
    console.log(e.target.dataset.id);
  }
    render(){

      const buttonFollow =
      this.state.isFollow ? 
      <button class="button is-dark is-radius is-title is-size-6 is-small following" data-follow={this.props.id}
      onClick={this.follow}>Following</button>   
      :       <button class="button is-dark is-radius  is-title is-size-6 is-small" data-follow={this.props.id}
      onClick={this.follow}>Follow<i class="fa fa-plus has-text-white is-bold  px-3 mt-1" aria-hidden="true"></i></button>
  
        return(
           buttonFollow
        )
    }
}

export default ButtonFollow;