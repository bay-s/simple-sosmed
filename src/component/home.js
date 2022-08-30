import React from 'react'
import { Link } from 'react-router-dom'
import img from '../akun.jpg'
import {database} from '../firebase';
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot, setDoc, query, orderBy, where} from 'firebase/firestore';
import PostContent from './post-content'
import ProfileSidebar from './profile-sidebar'
import SidebarPost from './right-sidebar'
import UserRecomendCard from './user-recomend-card'


class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            dataPost:[],
            avatar:'',
            username:'',
            loading:true,
            getAvatar:[],
            avatar_id:[]
        }
    }

    async componentDidMount(){
        const id = this.props.id
        console.log(id);
        const db = collection(database,'post')
        const db1 = collection(database,"user")
        const q = query(db1 ,where("uid","==" , id))

  await getDocs(db).then(res => {
    if (res) {
        res.docs.map(item => {
            const data = item.data()
            console.log(data);
    return this.setState({ 
        dataPost:this.state.dataPost = res,
        loading:this.state. loading = false,
        avatar_id:this.state.avatar_id = data.user_post_id
       })  
          })
        }
    })

        // GET USER LOGIN
     getDocs(q).then(res => {
          res.docs.map(item => {
          const data = item.data()
          console.log(data);
            return this.setState({ 
                username:this.state.username = data.username,
              avatar:this.state.avatar = data.images,
              })  
            });
          })
        
                      //  GET ALL POIST


  await getDocs(db).then(res => {
    if (res) {
        res.docs.map(item => {
            const data = item.data()
    return this.setState({ 
        dataPost:this.state.dataPost = res,
        loading:this.state. loading = false,
        avatar_id:this.state.avatar_id = data.user_post_id
       })  
          })
        }
    })


    }

    render(){

        const postContentCard = this.state.dataPost.length < 1 ? "" : this.state.dataPost.docs.map(item => {
          const post = item.data()
          console.log(post);
          return <PostContent  post={post}  id={this.props.id} name={this.props.name} />
        })

        return(
<div className='container my-fluid mt-6'>
  <div className='columns is-multiline mx-6 is-centered is-variable is-desktop is-6-widescreen home-container'>

              {/* START MAIN COLUMN */}            
<div className='column is-three-fifths '>
<>
<UserRecomendCard />
</>

 <div className='columns is-multiline  p-0 '>
{this.state.loading ? <div className='column is-12 '> <div class="card-loader is-loading">
    <div class="image"></div>
    <div class="content-loader">
      <h2></h2>
      <p></p>
    </div>
  </div> 
  </div> : postContentCard }
  
  </div>

        </div>
              
              {/* END MIDDLE COLUMN */}
            {/* START RIGHT SIDEBAR */}
                <div className='column is-4 p-0 right-sidebar'>
               <ProfileSidebar id={this.props.id} total_follow={this.props.total_follow} total_following={this.props.total_following} name={this.props.name} fullname={this.props.fullname} avatar={this.props.avatar} total_post={this.props.total_post} />
               <SidebarPost />
                </div>
            {/* END RIGHT COLUMN */}
            </div>
         </div>
        )
    }
}

export default Home;