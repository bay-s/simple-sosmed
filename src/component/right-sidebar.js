import React from 'react'


function SidebarPost(){

    return(
<div className='is-flex is-flex-direction-column is-flex-gap-md card p-0'>

    <div class='p-5 is-flex is-flex-direction-column is-flex-gap-xl suggest'>
       <div className='is-flex is-justify-content-space-between is-align-items-center'>
       <h3 className='has-text-weight-bold is-title has-text-dark is-size-5 p-0'>Suggestion For You</h3>
        <a href='#0' className='has-text-link has-text-weight-bold p-0 m-0'>See All</a>
       </div>

       <div class='is-flex is-justify-content-space-between is-align-items-center'>
      <figure className="image is-32x32">
         <img className="is-rounded avatar" src="https://bulma.io/images/placeholders/128x128.png" alt=''/> 
     </figure>
     <div className='is-flex is-flex-direction-column is-align-items-start'>
        <h3 className='has-text-weight-bold has-text-dark is-size-6'>Paolo Dicanio</h3>
        <h5 className='has-text-weight-bold has-text-dark is-size-7'>@Paolo</h5>
     </div>
     <button class="button is-info is-small is-focused">Follow</button>
      </div>

    </div>
    <div className='posts p-4 is-flex is-flex-direction-column is-flex-gap-md'>
        <h3 className='has-text-dark has-text-weight-bold is-size-4 is-title'>Newest Post</h3>
        <ul className='is-flex is-flex-direction-column'>
        <li className='py-3'>
            <a href='#'>Some post sesek 5 pos</a>
          </li>
          <li className='py-3'>
            <a href='#'>Some post sesek 5 sesek 5</a>
          </li>
          <li className='py-3'>
            <a href='#'>Some post sesek 5</a>
          </li>
          <li className='py-3'>
            <a href='#'>Some post Some post pos</a>
          </li>
          <li className='py-3'>
            <a href='#'>Some post sesek 5 Some post</a>
          </li>
        </ul>
    </div>
        {/* POST */}
</div>
    )
}


export default SidebarPost;