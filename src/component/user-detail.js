
import React from 'react'
import Header from './header'
import logo from '../default.jpg'

class UserDetail extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
return(
<>
<Header />
<div className='user-container'>
    <div className='profile'>
     <div className='image-wrap'>
         <img src={logo} />
     </div>
     <div className='profile-list'>
         <div className='user-list-name'>
         <h4 className='title'>MyAcountOfficial</h4>
         <ul>
          <li><a href='#'>Follow</a></li>
          <li><a href='#'><i class="fa fa-user-o" aria-hidden="true"></i></a></li>
          <li><a href='#'><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a></li>
         </ul>
         </div>
         <ul className='user-post-info'>
         <li><span>200 posts</span></li>
         <li><a href='#'>2 Follower</a></li>
         <li><a href='#'>20 Followwing</a></li>
        </ul>
        <div className='desc'>
           <h4 className='desc-title'>MyAcountOfficial</h4>
           <p>Official IG account of MyAnimeList.net. Add your favorite anime & manga to your list and share it with your friends! Sign up today!</p>
           <a href='#'>somelink.com</a>
        </div>
     </div>
    </div>

    <div className='user-post'>
    <ul className='post-title'>
     <li><i class="fa fa-camera" aria-hidden="true"></i><a href='#'>posts</a></li>
     <li><i class="fa fa-play-circle-o" aria-hidden="true"></i><a href='#'>Videos</a></li>
     <li><i class="fa fa-tags" aria-hidden="true"></i><a href='#'>Tagged</a></li>
    </ul>
    <div className='card'>
        <h1>SOME CARD</h1>
    </div>
    <div className='card'>
        <h1>SOME CARD</h1>
    </div>
    <div className='card'>
        <h1>SOME CARD</h1>
    </div>
    <div className='card'>
        <h1>SOME CARD</h1>
    </div>
    <div className='card'>
        <h1>SOME CARD</h1>
    </div>
    <div className='card'>
        <h1>SOME CARD</h1>
    </div>
    </div>
</div>
</>
)
    }
}

export default UserDetail;