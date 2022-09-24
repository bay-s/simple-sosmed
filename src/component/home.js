import React from 'react'
import { Link } from 'react-router-dom'
import img from '../akun.jpg'
import {database} from '../firebase';
import {enableIndexedDbPersistence,arrayUnion,collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot, setDoc, query, orderBy, where} from 'firebase/firestore';
import PostContent from './post-content'
import ProfileSidebar from './profile-sidebar'
import SidebarPost from './right-sidebar'
import UserRecomendCard from './user-recomend-card'
import Animasi from './animasi';


class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            dataPost:[],
            loading:true,
            getAvatar:[],
            avatar_id:[]
        }
    }

    async componentDidMount(){
        const id = this.props.id

        const db = collection(database,'post')
        const db1 = collection(database,"user")
        const q = query(db1 ,where("uid","==" , id))
        const is_data_exist = window.localStorage.getItem("dataPost")
        if(is_data_exist){
        this.setState({loading:false})
          }
                      //  GET ALL POIST

  // await getDocs(db).then(res => {
  //   if (res) {
  //       res.docs.map(item => {
  //           const data = item.data()

  //      const dataJson = JSON.stringify(data);
  //      const avatarJson = JSON.stringify(data.user_id)
  //      const saveToLocal = localStorage.setItem("dataPost",dataJson )
  //      const avatars = localStorage.setItem("avatar",avatarJson )
  //   return this.setState({ 
  //       // dataPost:this.state.dataPost = res,
  //       loading:this.state. loading = false,
  //       avatar_id:data.user_id
  //      })  
  //         })
  //       }
  //   })


    }


  
    render(){

      const is_data_exist = window.localStorage.getItem("dataPost")
     let postJson;
      if(is_data_exist){
      postJson = JSON.parse(is_data_exist);
      }
        // const postContentCard = this.state.dataPost.length < 1 ? "" : this.state.dataPost.docs.map(item => {
        //   const post = item.data()
        //   return <PostContent  post={post}  id={this.props.id} name={this.props.name} />
        // })

        const postContentCard = is_data_exist  ? <PostContent  post={postJson}  id={this.props.id} dataUser={this.props.dataUser} />: <PostContent  post={this.state.dataPost}  id={this.props.id} dataUser={this.props.dataUser} />
        return(
          <div className='container my-fluid mt-6'>
            <div className='columns is-multiline mx-6 is-centered is-variable is-desktop is-6-widescreen home-container'>
          
                        {/* START MAIN COLUMN */}            
          <div className='column is-three-fifths '>
          
           <div className='columns is-multiline  p-0 '>
          {this.state.loading ? <Animasi /> : postContentCard }
            
            </div>
          
                  </div>
                        
                        {/* END MIDDLE COLUMN */}
                      {/* START RIGHT SIDEBAR */}
                          <div className='column is-4 p-0 right-sidebar'>
                      
                         <ProfileSidebar skills={this.props.dataUser.skills} id={this.props.id} dataUser={this.props.dataUser} />
                         <SidebarPost user_login_id={this.props.id} />
                          </div>
                      {/* END RIGHT COLUMN */}
                      </div>
                   </div>
                  )
    }
}

export default Home;