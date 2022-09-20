import React from 'react'


function ProfilePageContentRight(props){


    const skills = props.skills ==='' ? "" : props.skills.split(',');
    return(
        <div className='column is-one-third box'>
        <div className='is-flex justify-between align-center mb-4'>
           <h3 className='title m-0 is-title is-6 has-text-weight-semibold'>Profile </h3>
          </div>
           <ul className='is-flex is-flex-column is-flex-gap-md px-1'>
           <li className='is-flex align-center is-flex-gap-md'>
             <i class="fa fa-calendar" aria-hidden="true"></i>
             <span className='is-title is-size-6 '>Joined August 2018</span> 
             {/* <span className='is-title is-size-6 '>{props.data.fullname}</span>  */}
           </li>
             <li className='is-flex align-center is-flex-gap-md'>
             <i class="fa fa-user" aria-hidden="true"></i>
             <span className=' is-size-6 has-text-weight-semibold'>{props.data.fullname}</span>  
             </li>
             <li className={props.data.job_title === '' ? "hide" : 'is-flex align-center is-flex-gap-md'}>
             <i class="fa fa-briefcase" aria-hidden="true"></i>
             <span className='is-title is-size-6 '>{props.data.job_title}</span> 
             </li>
             <li className={props.data.link_website === '' ? "hide" : 'is-flex align-center is-flex-gap-md'}>
             <i class="fa fa-globe" aria-hidden="true"></i>
             <a href={props.data.link_website}>{props.data.link_website}</a>
             </li>
             <li className= {props.data.phone === '' ? 'hide' :'is-flex align-center is-flex-gap-md'}>
             <i class="fa fa-phone" aria-hidden="true"></i>
             <span className='is-title is-size-6 '>{props.data.phone}</span> 
             </li>
           </ul>
           <hr/>
           <div className='is-flex justify-between align-center my-5'>
            <h3 className='is-title is-bold is-5'>Add Skills</h3>
             <i class="fa fa-pencil-square-o is-clickable is-bold is-size-5 open-add"  onClick={props.openModalSkills} aria-hidden="true"></i>
           </div>
           <div class="is-flex is-flex-gap-sm align-center is-flex-wrap-wrap">
              {props.skills === "" ? "" : skills.map((item,index) => {
                return <span className='tag is-info'>{item}</span>
                })
               }
            </div>
            {/* END SKILLS */}
        </div>
    )
}

export default ProfilePageContentRight;