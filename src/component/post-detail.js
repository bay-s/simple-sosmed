import React  from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from "../default.jpg";
import { database} from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import UserPostCard from './user-post-card';
import AnimasiCard from './animasi-card';

function Post(props){
    const {id} = useParams()
console.log(id);
    return(
       <PostDetailCard id={id}/>
    )
}

export default Post;

class PostDetailCard extends React.Component{
    constructor(){
        super()
        this.state = {
        dataPost:[],
        postDetail:[],
        akunUserName:'',
        akunImages:'',
        loading:true
        }
    }

    async componentDidMount(){
      const db = collection(database,'post')
      const id = this.props.id
// GET POST DETAIL
      const q = query(db,where("post_id","==" ,id))
      await getDocs(q).then(res => {
        res.docs.map(item => {
          const data = item.data()
          console.log(data);
          return this.setState({ 
            postDetail:this.state.postDetail = data
            })  
            });
          })

          const user = collection(database,'user')
          const idUser = this.state.postDetail.username
          console.log(idUser);
          const q2 = query( user,where("username","==" , idUser))
      // GET USER LOGIN
          await getDocs(q2).then(res => {
              res.docs.map(item => {
              const data = item.data()
              console.log(data);
                return this.setState({ 
                  akunUserName:this.state.akunUserName = data.username,
                   akunImages:this.state.akunImages = data.images
                  })  
                });
              })
      
                                //  GET ALL POIST
      const db2 = collection(database,'post')
      const q3 = query(db2,where("username","==" , idUser))
    
      await getDocs(q3).then(res => {
        this.setState({ 
          dataPost:this.state.dataPost = res
         })  
          })
    
          const animate = Array.isArray(this.state.dataPost.docs) ? this.setState({loading:this.state.loading = false}) : this.setState({loading:this.state.loading = true})
    
    }

    async componentDidUpdate() {
      const db = collection(database,'post')
      const id = this.props.id
// GET POST DETAIL
      const q = query(db,where("post_id","==" ,id))
      await getDocs(q).then(res => {
        res.docs.map(item => {
          const data = item.data()
          console.log(data);
          return this.setState({ 
            postDetail:this.state.postDetail = data
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
   <div className='user-container'>
         <div className="modal-post-container containers">
            <div className="modal-posts">
              <div className="modal-images">
                <img src={this.state.postDetail.post_image} />
              </div>
              <div className="modal-caption">
                <div className="modal-post-title">
                  <div className="judul-left">
                  <img src={this.state.akunImages.length < 1 ? logo : this.state.akunImages} />
                  <h3 className="name">{this.state.postDetail.username}</h3>
                  </div>
                  <a href="#0">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </a>
                </div>
      <div className="modal-content">
      <div className="caption-box">
                  <div className="judul-left">
                  <img src={this.state.akunImages.length < 1 ? logo : this.state.akunImages} />
                  <h3 className="name">{this.state.postDetail.username}</h3>
                  </div>
                  <div className="caption-text">
                    <p className="paraf">
                   SOME text
                    </p>
                  </div>
                </div>
                <div className="comment-box">
                  <div className="comment-content">
                    <div className="judul-left">
                    <img src={ logo} />
                      <h3 className="name">AKUN TEST</h3>
                    </div>
                    <div className="comment-text">
                      <p className="paraf">
                      {this.state.postDetail.caption}
                      </p>
                    </div>
                    <ul className="action">
                     <li><a href="#0">Likes</a></li> 
                     <li><a href="#0">Reply</a></li> 
                    </ul>
                  </div>
                </div>
                <div className="comment-box">
                  <div className="comment-content">
                    <div className="judul-left">
                    <img src={ logo} />
                      <h3 className="name">AKUN TEST</h3>
                    </div>
                    <div className="comment-text">
                      <p className="paraf">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Nesciunt iure, ex vitae velit commodi consectetur
                      </p>
                    </div>
                    <ul className="action">
                     <li><a href="#0">Likes</a></li> 
                     <li><a href="#0">Reply</a></li> 
                    </ul>
                  </div>
                </div>
                <div className="comment-box">
                  <div className="comment-content">
                    <div className="judul-left">
                    <img src={ logo} />
                      <h3 className="name">AKUN TEST</h3>
                    </div>
                    <div className="comment-text">
                      <p className="paraf">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Nesciunt iure, ex vitae velit commodi consectetur
                      </p>
                    </div>
                    <ul className="action">
                     <li><a href="#0">Likes</a></li> 
                     <li><a href="#0">Reply</a></li> 
                    </ul>
                  </div>
                </div>
      </div>
      <div className="post-menu-container">
      <div className="post-menu">
                  <ul className="action">
                    <li>
                      <a href="javascript:void(0)">
                        <i class="fa fa-heart" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i class="fa fa-comment" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <i class="fa fa-share" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                  <div className="total-like">
                    <p className="likes">
                     Be de first likes
                    </p>
                  </div>
                </div>
               <form className="input-comment">
               <textarea>Tambahkan komentar..</textarea>
                  <button type="submit">Post</button>
               </form>
      </div>
              </div>
            </div>
          </div>
     <div className='user-post-detail'>
     <div className="post-title">
      <p>More posts from</p>
      <Link to={`/account-detail/${this.state.postDetail.user_post_id}`}>{this.state.postDetail.username}</Link>
      </div>
     {this.state.loading ? <AnimasiCard /> : postCard}
     </div>
   </div>
        )
    }
}