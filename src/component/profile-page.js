import React, { useEffect, useState } from 'react'
import { Link, useParams ,useNavigate, Navigate} from 'react-router-dom'
import akun from '../akun.jpg'
import {database,auth} from '../firebase';
import { getAuth, deleteUser } from "firebase/auth";
import { collection, getDocs,query, where,doc, deleteDoc,getDocFromCache} from 'firebase/firestore';
import banners from "../banner.jpg";
import Banner from './banner';
import BannerUser from './banner-user';
import UserProfilePage from './user-profile-page';
import PostCard from './post-card';
import ModalDeleteAccount from './modal-delete-account';
import FollowerCard from './follower-card';
import FollowingCard from './following-card';


function ProfilePage(props){
  const [myId, setMyid]  = useState(false)
  const {id} = useParams()
  const ID = props.id

  const db = collection(database,"user")
  const q = query(db,where("uid","==" ,id))

  // GET USER LOGIN
getDocs(q).then(res => {
if (res.docs.length < 1) {
setMyid(true);
}
})


  return(
<div className="container my-fluid ">
<div className="columns is-multiline  is-centered">
{/*  BANNER */}
  {id === ID ? <Banner ID={ID}/> : <BannerUser id={id}/> }
      {myId ?  <Navigate to="*" replace={true} /> : id === props.id ? <UserProfileCard id={id} ID={ID} isLogin={props.isLogin} /> : <UserProfilePage id={id} ID={ID} isLogin={props.isLogin} avatar={props.avatar} user_name={props.user_name} /> }
  
 {/*  END BANNER */}

</div>
{/* END COLUMNS */}
</div>
  )
}

export default ProfilePage;


class UserProfileCard extends React.Component{
  constructor(){
      super()
      this.state = {
         data:[],
         modal:false,
         modalDelete:false,
         dataPost:[],
         loading:true,
         follower:[],
         following:[],
         option:'POST'
      }
  }

  async componentDidMount() {
      
      const db = collection(database,"user")
      const post = collection(database,'post')
      const follower = collection(database,'user_follower')
      const id = this.props.ID;
      const q = query(db,where("uid","==" , id))
      const q2 = query(post,where("user_id","==" , id))
      const queryFollow = query(follower,where("uid","==" , id))
      
      // GET USER LOGIN
   getDocs(q).then(res => {
        res.docs.map(item => {
        const data = item.data()
          return this.setState({ data:this.state.data = data})  
          });
        })
      
      //   GET ALL POST
        await getDocs(q2).then(res => {
            if (res) {
                this.setState({ 
                    dataPost:this.state.dataPost = res,
                    loading:this.state. loading = false
                   })  
            }
              })
        
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
          
  }

  async componentDidUpdate() {
      
    const db = collection(database,"user")
    const post = collection(database,'post')
    const id = this.props.ID;
    const q = query(db,where("uid","==" , id))
    const q2 = query(post,where("user_id","==" , id))

    // GET USER LOGIN
 getDocs(q).then(res => {
      res.docs.map(item => {
      const data = item.data()
        return this.setState({ data:this.state.data = data})  
        });
      })
    
    //   GET ALL POST
      await getDocs(q2).then(res => {
          if (res) {
              this.setState({ 
                  dataPost:this.state.dataPost = res,
                  loading:this.state. loading = false
                 })  
          }
            })
      
}
          
  modals = (e) => {
      e.preventDefault()
      this.setState({modal:!this.state.modal})
      console.log(this.state.modal);
    }
        
removeModal = (e) =>{
e.preventDefault()
if(confirm("Are you sure want to cancel this ?")){
  this.setState({ modal:!this.state.modal})
}else{
  console.log("tidak");
}
}



deleteAccount = (e) => {
  const user = auth.currentUser;
  const id = this.props.ID
  if (confirm('Are you sure you want to delete this account')) {
      // Save it!
deleteUser(user).then(() => {
  // User deleted.
  console.log('User deleted.');
  deleteDoc(doc(database,'user',id))
  deleteDoc(doc(database,'user_follower',id))
  deleteDoc(doc(database,'notifikasi',id))
  }).catch((error) => {
  // An error ocurred
  alert("An error ocurred");
  });
    } else {
      // Do nothing!
      console.log('Delete canceled.');
    }
}

displayOption = (e) => {
  const id = e.target.dataset.name;
  this.setState({option:this.state.option = id})
}

openModalDelete = e  => {
  e.preventDefault()
this.setState({modalDelete:!this.state.modalDelete})
}
  render(){

      const postCard = Array.isArray(this.state.dataPost.docs) ? this.state.dataPost.docs.map((post,index)=> {
          const posts = post.data()
          return <PostCard data={posts} avatar={this.state.data.images} isLogin={this.props.isLogin} id={this.props.ID}/>
          }) : ""

      const followCard = this.state.follower != null ? this.state.follower.map(data => {
       return <FollowerCard follow_id={data} user_id={this.props.id }/>
      }) : ""

      const followingCard = this.state.following != null ? this.state.following.map(data => {
        return <FollowingCard follow_id={data} user_id={this.props.id }/>
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
                   class="is-rounded border-md "
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
             <Link to={`/edit-profile/${this.props.id}`} class="button is-link is-outlined is-title is-small"><i class="fa fa-cog is-size-6 mx-3" aria-hidden="true"></i> Edit Profile</Link>
             <button class="button is-danger is-outlined is-title is-small"  onClick={this.openModalDelete }><i class="fa fa-trash mx-3" aria-hidden="true" ></i>Delete Account</button>
             </div>
           </div>
           {/* END PROFILE */}
  <div className="is-flex is-flex-direction-column is-flex-gap-sm is-align-items-start my-4">
           <nav class="level is-mobile">
   <div class="level-item has-text-centered">
     <div>
       <p class="heading">Post</p>
       <p class="title">{this.state.data.total_post}</p>
     </div>
   </div>
   <div class="level-item has-text-centered">
     <div>
       <p class="heading">Following</p>
       <p class="title">{this.state.data.total_following}</p>
     </div>
   </div>
   <div class="level-item has-text-centered">
     <div>
       <p class="heading">Followers</p>
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
             {postCard}
             {/* <UserPostCard /> */}
            </div> 
         </div>
         {/* END COLUMN CONTENT*/}
         


 <div className={this.state.modalDelete ? 'modal is-active' : 'modal'}>
 <div class="modal-background"></div>
 <ModalDeleteAccount modalDelete={this.openModalDelete} deleteAccount={this.deleteAccount}/>
 <button class="modal-close is-large" aria-label="close" onClick={this.openModalDelete }></button>
 </div>
         </>
      );
  }
}










