import React from 'react'
import { Link ,Navigate,useNavigate} from 'react-router-dom';
import maki from '../maki.jpg'
import logo from '../default.jpg'
import {database,auth,storage} from '../firebase';
import { collection, addDoc ,getDocs, doc, updateDoc, deleteDoc,onSnapshot, setDoc, query, orderBy, where} from 'firebase/firestore';
import PostCard from './post-card';
import Animasi from './animasi';

class PostPage extends React.Component{
constructor(){
    super()
    this.state = {
        saveImage:false,
        url:'',
        modal:false,
        username:'',
        website:'',
        bio:'',
        name:'',
       akunName:'',
       akunEmail:'',
       akunUserName:'',
       akunBio:'',
       akunWebsite:'',
       akunImages:'',
       dataPost:[],
       loading:true,
       totalPost:0,
       avatarId:[],
       count:0,
      totalLike:[]
    }
}

async componentDidMount(){

// GET ALL USER 
const dbs = collection(database,'user')
await getDocs(dbs).then(res => {
  res.docs.map(item => {
    const data =item.data()
this.setState({avatarId:this.state.avatarId = data.uid})
    });
  })

  //  GET LIKES 
  const likes = collection(database,'likes')
  await getDocs(likes).then(res => {
    this.setState({totalLike:this.state.totalLike = res})
    })
  
    
    const db = collection(database,'user')
    const id = this.props.id
    const q = query(db,where("uid","==" , id))
// GET USER LOGIN
    await getDocs(q).then(res => {
        res.docs.map(item => {
        const data = item.data()
          return this.setState({ 
            akunName:this.state.akunName = data.fullname,
            totalPost:this.state.totalPost = data.total_post,
            akunUserName:this.state.akunUserName = data.username,
             akunImages:this.state.akunImages = data.images
            })  
          });
        })
        const db1 = collection(database,'user-info')
        const q1 = query(db1,where("info_id","==" , id))

// GET USER INFO LOGIN
        await getDocs(q1).then(res => {
            res.docs.map(item => {
            const data = item.data()
              return this.setState({ 
                akunWebsite:this.state.website = data.website,
                akunBio:this.state.bio = data.bio
                })  
              });
            })


              //  GET POIST
  const db2 = collection(database,'post')

  await getDocs(db2).then(res => {
    this.setState({ 
      dataPost:this.state.dataPost = res
     })  
      })

const animate = Array.isArray(this.state.dataPost.docs) ? this.setState({loading:this.state.loading = false}) : this.setState({loading:this.state.loading = true})

}

componentDidUpdate(){
  if (this.state.user_like === this.props.id) {
    console.log("anda telah menyukai post ini");
  }
}

handlerChange = (e) => {
    const {name,value} = e.target
console.log(value);
    this.setState(prev => {
      return{
   [name]:value
      }
    })
  }


modalForm = (e) => {
    e.preventDefault()
    this.setState({modal:!this.state.modal})
    console.log(this.state.modal);
}

removeModal = (e) =>{
    e.preventDefault()
    this.setState({ modal:!this.state.modal})
  // if (e.target.classList.contains('modals')) {
  //   this.setState({ modal:!this.state.modal})
  // }
  }


logout = (e) => {
  e.preventDefault()
  auth.signOut();
}

postLikes = e => {
  e.preventDefault()
  const id_likes = e.target.dataset.likes
 e.target.classList.toggle('add-likes')
 const docUpdate = doc(database,'post',this.props.id)
 const db = collection(database,'likes')
 console.log(id_likes);
if (this.state.user_like === this.props.id) {
  console.log("anda telah menyukai post ini");
}
this.setState({count:this.state.count = this.state.count + 1})
if (this.state.count < 2) {
  updateDoc(docUpdate,{
    like:+ 1
  })
  setDoc(doc(db,id_likes), {
    user_like_id: [this.props.id],
    username_likes:[this.state.akunUserName],
    post_id:id_likes
  })
  .then(() => {console.log("Likes added")})  
  .catch((err) => {console.log(err)})
  console.log(this.state.like);
}else{
  updateDoc(docUpdate,{
    total_likes:this.state.like - 1
  })
}
}
  render(){
    const styles = {
        backgroundImage:`url(${maki})`
  }

  const postCard = Array.isArray(this.state.dataPost.docs) ? this.state.dataPost.docs.map((post,index)=> {
    const posts = post.data()
    return <PostCard id={this.state.avatarId }  liked={this.state.totalLike} postLikes={this.postLikes} data={posts} />
    }) : ""
    return(
<>
{/* <Header openModal={this.modalForm} logout={this.logout}/> */}

<div className='post-container'>
            <div className='main-post'>

{this.state.loading ? <Animasi /> : postCard}

{/* <div className={this.state.modal ? 'modals' : "modal-container"}>
{this.state.modal ? <ModalPost removeModal={this.removeModal} Post={this.state.totalPost} id={this.props.id} username={this.state.akunUserName} images={this.state.akunImages} Submit={this.handleSubmit} Change={this.handlerChange} />  : ""}
<div className={this.state.modal ? 'close' : "hide"}>
<i class="fa fa-times" aria-hidden="true" onClick={this.removeModal}></i>
</div>
</div> */}

            </div>
      {this.state.loading ? <Animasi /> : <div className='profile-menu'>
        <div className='profil-info'>
        <img src={this.state.akunImages.length < 1 ? logo : this.state.akunImages} />
         <div className="judul-left">
         <h3 className="name"><Link to={`/account/${this.props.id}`}>{this.state.akunUserName}</Link></h3>
         <p className='names'>{this.state.akunName}</p>
         </div>
        </div>
       
      </div>
}
 

        </div>
</>
            )
  }
}

export default PostPage;

