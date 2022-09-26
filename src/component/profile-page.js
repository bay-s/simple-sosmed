import React, { useEffect, useState } from 'react'
import { Link, useParams ,useNavigate, Navigate} from 'react-router-dom'
import {database,auth} from '../firebase';
import {deleteUser } from "firebase/auth";
import { collection, updateDoc,getDocs,query, where,doc, deleteDoc,getDocFromCache} from 'firebase/firestore';
import banners from "../banner.jpg";
import Banner from './banner';
import BannerUser from './banner-user';
import UserProfilePage from './user-profile-page';
import ModalDeleteAccount from './modal-delete-account';
import FollowerCard from './follower-card';
import FollowingCard from './following-card';
import ModalFollower from './modal-follower';
import ModalFollowing from './modal-following';
import ModalAddSkill from './modal-add-skill';
import ProfilePageAvatar from './profile-page-avatar';
import ProfilePageAvatarRight from './profile-page-avatar-right';
import ProfilePageContentLeft from './profile-page-content-left';
import ProfilePageContentRight from './profile-page-content-right';
import EditModal from './edit-modal';



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
         skills:'',
         modal:false,
         modalDelete:false,
         modalFollower:false,
         modalFollowing:false,
         modalEdit:false,
         modalSkills:false,
         openInput:false,
         dataPost:[],
         loading:true,
         follower:[],
         following:[],
         option:'POST',
         SkillText:'',
         SkillTextArr:[]
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
      console.log(db);
      // GET USER LOGIN

   getDocs(q).then(res => {
        res.docs.map(item => {
        const data = item.data()
        const skills = data.skills ==='' ? "" : data.skills.split(',');

          return this.setState({ 
            data:this.state.data = data,
            skills:data.skills,
            SkillTextArr:[...this.state.SkillTextArr,...skills]
          })  
          });
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

//  const is_data_exist = window.localStorage.getItem("profile_post")
//  if(is_data_exist){
//   console.log(JSON.parse(is_data_exist));
// this.setState({dataPost:JSON.parse(is_data_exist)})
//  }
                      // GET ALL POST

      await getDocs(q2).then(res => {
        if (res) {
        res.docs.map(item => {
          const data = item.data()
          this.setState({ dataPost:data})  
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

if(window.confirm("Are you sure want to cancel this ?")){
  this.setState({ modal:!this.state.modal})
}else{
  console.log("tidak");
}
}

deleteAccount = (e) => {
  const user = auth.currentUser;
  const id = this.props.ID
  e.preventDefault()
  if (window.confirm('Are you sure you want to delete this account')) {
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

openModal = e  => {
  e.preventDefault()

if(e.target.classList.contains('open-delete')){
  this.setState({modalDelete:!this.state.modalDelete})
}if(e.target.classList.contains('open-following')){
  this.setState({ modalFollowing:!this.state.modalFollowing})
}if(e.target.classList.contains('open-follower')){
  this.setState({modalFollower:!this.state.modalFollower})
}if(e.target.classList.contains('open-edit')){
  this.setState({modalEdit:!this.state.modalEdit})
}if(e.target.classList.contains('open-add')){
  this.setState({modalSkills:!this.state.modalSkills})
}

}

closeModal = e  => {
  e.preventDefault()
  this.setState({
    modalFollower:false,
    modalFollowing:false,
    modalDelete:false,
    modalEdit:false,
    modalSkills:false
  })
}



handlerChange = e => {
  const {name,value} = e.target

  this.setState(prev => {
    return{
 [name]:value
    }
  })
}


removeArr = e => {
  e.preventDefault()
  const copyArr = [...this.state.SkillTextArr]; // make a separate copy of the array
  const index = copyArr.indexOf(e.target.parentElement.textContent)
  if (index !== -1) {
    copyArr.splice(index, 1);
    this.setState({SkillTextArr:copyArr });
    console.log(this.state.SkillTextArr);
  }
}
AddSkills = e  => {
  e.preventDefault()

this.setState({
  openInput:this.state.openInput = true,
  SkillTextArr:[...this.state.SkillTextArr, ...[this.state.SkillText] ] 
})
console.log(this.state.SkillTextArr );
}

updateSkills = e => {
  e.preventDefault()
  const docUpdate = doc(database, "user", this.props.id);
  const arr =this.state.SkillTextArr.toString()
console.log(arr);
  updateDoc(docUpdate, {
    skills: arr,
  })
    .then(() => {
      alert("Update Sukses");
    })
    .catch((err) => {
      alert(err);
    });
}
  render(){



      const followCard = this.state.follower != null ? this.state.follower.map(data => {
       return <FollowerCard follow_id={data} user_id={this.props.id }/>
      }) : ""

      const followingCard = this.state.following != null ? this.state.following.map(data => {
        return <FollowingCard follow_id={data} user_id={this.props.id }/>
       }) : ""

      return (
        <>
<div className="column is-10 box ">
<div className='columns is-multiline align-center'>
<div className='column'>
<ProfilePageAvatar data={this.state.data} openModal={this.openModal} />
</div>
 {/* END LEFT PROFILE */}
 <div className='column is-one-fifth'>
<ProfilePageAvatarRight openModal={this.openModal} id={this.props.id} />
</div>
{/* END RIGHT PROFILE */}
</div>
</div>
        {/* END AVATAR */}
<div className='column is-10 p-0 m-0'>
    <div className='columns is-multiline'>
<ProfilePageContentLeft openModal={this.openModal } data={this.state.data} isLogin={this.props.isLogin} ID={this.props.ID} dataPost={this.state.dataPost}/>    
  {/* END COLUMN LEFT */}
<ProfilePageContentRight skills={this.state.skills} openModalSkills={this.openModal} data={this.state.data}/>   
   {/* END COLUMN RIGHT */}
    </div>
    {/* END COLUMNS INNER */}
</div>
{/* END CONTAINER */}


{/* MODAL */}

{/* MODAL DELETE */}
<div className={this.state.modalDelete ? 'modal is-active' : 'modal'}>
 <div class="modal-background"></div>
 <ModalDeleteAccount modalDelete={this.closeModal}  deleteAccount={this.deleteAccount}/>
 <button class="modal-close is-large close-delete" aria-label="close" onClick={this.closeModal }></button>
 </div>
 {/* MODAL FOLLOWER */}
 <div className={this.state.modalFollowing ? 'modal is-active' : 'modal'}>
 <div class="modal-background"></div>
 <ModalFollowing closeModal={this.closeModal} id={this.props.id} following={this.state.following}/>
 <button class="modal-close is-large close-following" aria-label="close"  onClick={this.closeModal }></button>
 </div>
 {/* MODAL FOLLOWING */}
 <div className={this.state.modalFollower ? 'modal is-active' : 'modal'}>
 <div class="modal-background"></div>
 <ModalFollower closeModal={this.closeModal} id={this.props.id} follower={this.state.follower}/>
 <button class="modal-close is-large close-follower" aria-label="close"  onClick={this.closeModal }></button>
 </div>


 <div className={this.state.modalSkills ? 'modal is-active ' : 'modal' }>
<ModalAddSkill removeArr={this.removeArr} updateSkills={this.updateSkills} skills={this.state.skills} SkillText={this.state.SkillTextArr} handlerChange={this.handlerChange} addSkill={this.AddSkills} openInput={this.state.openInput} openModal={this.openModalSkills}/>
 <button class="modal-close is-large" aria-label="close" onClick={this.closeModal }></button>
 </div>

 <div className={this.state.modalEdit ? 'modal is-active' : 'modal'}>
<EditModal id={this.props.ID} data={this.state.data} openModal={this.closeModal } />
<button class="modal-close is-large" aria-label="close" onClick={this.closeModal }></button>
</div>
{/* END MODAL */}
        </>
      );
  }
}










