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
    const id = this.props.user_login_id;
    const follower = collection(database, "user_follower");
    const q = query(db, where("uid", "==", id));
    const queryFollow = query(follower, where("uid", "==", id));
  
    // GET USER
    getDocs(q).then((res) => {
      res.docs.map((item) => {
        const data = item.data();
        console.log(data);
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
                    data.follower.map(f_id  => {
                      if(f_id === id) 
                      {     
                        console.log("sama");
                        this.setState({
                          follower_id: (this.state.follower_id = f_id ),
                          isFollow:this.state.isFollow = true
                        });
                      }else{
                  console.log("Tes");
                      }
                    })
                      });
                    })
      }
      
      async componentDidUpdate() {
        const db = collection(database, "user");
        const id = this.props.user_login_id;
        const follower = collection(database, "user_follower");
        const q = query(db, where("uid", "==", id));
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
                        data.follower.map(f_id  => {
                          if(f_id === id) 
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
        user_name: this.state.data.username,
        user_id: notif_id,
        user_avatar:this.state.data.images,
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
    const current_user = this.props.user_login_id;
    const docUpdate = doc(database, "user_follower", current_user);
    const user = doc(database, "user", current_user );
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
    const current_user =  this.props.user_login_id;
    updateDoc(docUpdate, {
      follower: arrayUnion(current_user),
    })
      .then(() => console.log("follow succes"))
      .catch((err) => {
        alert(err.message);
      });
  };
  
  follow = (e) => {
    const user_id = this.props.user_id;
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
          total_follower:this.state.total_followers + 1,
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
    const removeFollowing = doc(database, "user_follower", this.props.user_login_id);
    const user = doc(database, "user", this.props.ID);
    const removeFollower = doc(database, "user_follower", user_id);
  
    updateDoc(removeFollower, {
      follower: arrayRemove(this.props.user_login_id),
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
      <button class="button is-link is-outlined is-title is-size-6 is-small following" data-follow={ this.props.user_login_id}
      onClick={this.follow}>Following</button>   
      :       <button class="button is-link is-outlined is-title is-size-6 is-small" data-follow={ this.props.user_login_id}
      onClick={this.follow}>Follow</button>
  
    
        return(
           buttonFollow
        )
    }
}

export default ButtonFollow;