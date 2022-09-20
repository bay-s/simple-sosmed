import React from 'react'
import banners from '../banner2.jpg'

function RegisterPageLeft(props){

    const banner =  {
        backgroundImage:`url(${banners})`,
        height:`${200}px`
      }
      
 
    return(
        <>
 <div className='banner' style={banner}></div>
            <div className='is-flex is-flex-column is-flex-gap-lg p-3 text-center H-100'>
               <h3 className='title main-title  is-1 is-bold'>
               Simple Sosmed
               </h3>
               <h4 className='is-title is-size-5 has-text-link is-bold'>
               Social media sederhana untuk share project portofolio.
               </h4>
               <p className='has-text-grey-light is-bold is-size-6 lh-sm'>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis ex deleniti aliquam tempora libero excepturi vero soluta odio optio sed.
               </p>
        
        <article class={props.error ? "message is-danger" : 'hide'}>
          <div class="message-body">
         <i> {props.pesan}</i>
          </div>
        </article>
        <article class={props.sukses ? "message is-success" : 'hide'}>
          <div class="message-body">
         <i> {props.pesan}</i>
          </div>
        </article>
</div>
        </>
    )
}

export default RegisterPageLeft;