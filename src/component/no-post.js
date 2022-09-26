import React from 'react'
import nopost from '../no-post.jpeg'

function NoPost(){

    return(
        <div className='container mx-auto my-5 px-5'>
         <div className='is-flex is-flex-column justify-content-center align-center'>
         <figure class="image is-96x96 avatar">
           <img src={nopost} className='is-rounded' alt=''/>
        </figure>
        <p className='subtitle is-7 is-title'>When you share photos, they will appear on your profile.</p>
         </div>
        </div>
    )
}

export default NoPost;