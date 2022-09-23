import React from 'react'
import PostCard from './post-card';
import NoPost from './no-post';


function ProfilePageContentLeft(props){
    

    // const postCard = props.dataPost.length < 1 ? "" :  props.dataPost.map((post,index)=> {
    //     const posts = post.data()
    //     return <PostCard post={posts} name={props.data.username} avatar={props.data.images} key={index} index={index} isLogin={props.isLogin} id={props.ID}/>
    //     })

        const postCard = props.dataPost.length < 1 ? "" : 
      <PostCard post={props.dataPost} name={props.data.username} avatar={props.data.images} index={`index`} isLogin={props.isLogin} id={props.ID}/>
    
    return(
<div className='column box'>
<div className='px-3'>
        <div className='is-flex justify-between align-center mb-2'>
        {props.id === props.ID ? <h3 className='title is-title is-6 is-bold m-0'>Write About Yourself</h3> : <h3 className='title is-title is-6 is-bold m-0'>About</h3>}
        {props.id === props.ID ? <i class="fa fa-pencil-square-o is-clickable is-bold is-size-5 open-edit" aria-hidden="true" onClick={props.openModal}></i> : ""}
        </div>
<p className={props.data.biodata === '' ? 'hide' : 'subtitle is-6'}>
{props.data.biodata}
</p>
        </div>
        <hr/>
          {/* END ABOUT */}
       <div className="columns is-multiline mt-1">
       <div className='column is-12'>
       <h3 className='title is-title is-6 is-bold m-0 px-3'>Post</h3>
       </div>
       {props.dataPost == 0 || props.dataPost == null ? <NoPost />  : postCard}
         {/* <UserPostCard /> */}
        </div>  
</div>   
// END CONTAINER
    )
}

export default ProfilePageContentLeft;