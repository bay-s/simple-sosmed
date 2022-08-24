import React from 'react'
import { useParams } from 'react-router-dom'
import { database, auth, storage } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import logo from "../default.jpg";
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
import AnimasiCard from './animasi-card';
import Header from './header';
import UserPostCard from './user-post-card';
import AccountPage from './accont-page';
import ModalImage from './modal-detail';

export default function AccountDetail(props){
    const {id }=  useParams()

    return(
       <>
 {id === props.ids ? <AccountPage id={props.ids}/> : <AccountDetailCard  id={id} ids={props.ids}/>}
       </>
    )
}

class AccountDetailCard extends React.Component{
    constructor() {
        super();
        this.state = {
          saveImage: false,
          url: "",
          modal: false,
          modalImage:false,
          username: "",
          website: "",
          bio: "",
          akunName: "",
          akunEmail: "",
          akunUserName: "",
          akunBio: "",
          akunWebsite: "",
          akunImages: '',
          akunFollower: 0,
          akunFollowing: 0,
          dataPost:[],
          loading:true,
          totalPost:0,
          dataDetail:[]
        };
      }
    
      
      async componentDidMount(){
    
    
        const db = collection(database,'user')
        const id = this.props.id

        const q = query(db,where("uid","==" , id))
    // GET USER DETAIL
        await getDocs(q).then(res => {
            res.docs.map(item => {
            const data = item.data()
              return this.setState({ 
                akunName:this.state.akunName = data.fullname,
                akunEmail:this.state.akunEmail = data.email,
                akunUserName:this.state.akunUserName = data.username,
                 akunImages:this.state.akunImages = data.images
                })  
              });
            })

            // GET USER INFO
            const db1 = collection(database,'user-info')
            const q1 = query(db1,where("info_id","==" , id))
    
            await getDocs(q1).then(res => {
                res.docs.map(item => {
                const data = item.data()
                  return this.setState({ 
                    akunUserName:this.state.akunUserName = data.username,
                    akunWebsite:this.state.website = data.website,
                    akunBio:this.state.bio = data.bio,
                    akunFollower:this.state.akunFollowwing = data.following,
                    akunFollowing:this.state.akunFollower = data.follower,
                    totalPost:this.state.totalPost = data.post
                    })  
                  });
                })
    
                  //  GET POIST
      const db2 = collection(database,'post')
      const q2 = query(db2,where("user_post_id","==" , id))
    
      await getDocs(q2).then(res => {
        this.setState({ 
          dataPost:this.state.dataPost = res
         })  
          })
    
    const animate = Array.isArray(this.state.dataPost.docs) ? this.setState({loading:this.state.loading = false}) : this.setState({loading:this.state.loading = true})
    
    }
    

    removeModalPost = (e) => {
      e.preventDefault();
      this.setState({ 
        modalImage : !this.state.modalImage 
      });
    };
  
    modalImages = async (e) => {
  e.preventDefault()
  this.setState({ modalImage: !this.state.modalImage });
  const src = e.target.src
  const db2 = collection(database,'post')
  const q2 = query(db2,where("post_image","==" ,src))
  await getDocs(q2).then(res => {
    res.docs.map(item => {
      const data = item.data()
      return this.setState({ 
  dataDetail:this.state.dataDetail = data
        })  
        });
      })
  
    }


    render(){

      const postCard = Array.isArray(this.state.dataPost.docs) ? this.state.dataPost.docs.map(post => {
        const posts = post.data()
        return <UserPostCard  openModal={this.modalImages} imeji={this.state.akunImages} data={posts} />
        }) : ""

        return(
            <>
            {/* <Header /> */}
            <div className="user-container">
              <div className="profile">
                <div className="image-wrap">
      <img src={this.state.akunImages.length < 1 ? logo : this.state.akunImages} />
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
                          Follow
                        </a>
                      </li>
                    </ul>
                  </div>
                  <ul className="user-post-info">
                    <li>
                      <span>{this.state.totalPost} post</span>
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
                <div className={this.state.modalImage ? "modals" : "modal-container"}>
              {this.state.modalImage ? <ModalImage dataModal={this.state.dataDetail} name={this.state.akunUserName} image={this.state.akunImages} ids={this.props.ids}/> : ""}
<div className={this.state.modalImage ? 'close' : "hide"}>
<i class="fa fa-times" aria-hidden="true" onClick={this.removeModalPost }></i>
</div>
            </div>

              </div>
            </div>
    
          </>
        )
    }
}
