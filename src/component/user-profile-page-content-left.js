import React from 'react'
import PostCard from './post-card';
import NoPost from './no-post';


function UserPageContentLeft(props){
    

    const postCard = Array.isArray(props.dataPost) ? props.dataPost.map((post,index)=> {
        const posts = post.data()

        return <PostCard data={posts} avatar={props.data.images} key={index} index={index} isLogin={props.isLogin} id={props.ID}/>
        }) : ""

    return(
<div className='column box'>
<div className='px-3'>
        <div className='is-flex justify-between align-center mb-2'>
           <h3 className='title is-title is-6 is-bold m-0'>About</h3>
        </div>
<p className='subtitle is-6'>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta excepturi dolores quibusdam? Delectus, beatae molestias voluptatem asperiores quos consectetur enim perferendis alias quidem, sit accusantium?
</p>
        </div>
        <hr/>
          {/* END ABOUT */}
       <div className="columns is-multiline mt-1">
       {props.dataPost == 0 || props.dataPost == null ? <NoPost />  : postCard}
         {/* <UserPostCard /> */}
        </div>  
</div>   
// END CONTAINER
    )
}

export default UserPageContentLeft;