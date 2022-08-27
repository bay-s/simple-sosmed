import React from 'react'
import { Link } from 'react-router-dom'
import img from '../akun.jpg'

class MessageDetail extends React.Component{
constructor(){
    super()
    this.state = {

    }
}

render(){
    return(
      <div className='container my-fluid post-detail'>
   <div className='columns is-multiline is-centered mt-5'>
       <div className='column is-10  shadow p-0'>
<article class="message is-dark">
<div class="message-header is-flex justify-between">
<div className='media-left is-flex is-flex-gap-lg align-center mt-2'>
<figure class="image is-32x32">
<img src={img} className='is-rounded' alt="Placeholder image" />
</figure>
<div class="p-0 ">
<p class="subtitle is-6 is-title p-0 mb-1"><Link to={`/profile/`} className='has-text-white'>@{`post.username`}</Link></p>
<time>{`date`}</time>
</div>
</div>
<div className='subject'>
    <p className='is-size-5 is-title'>Subject</p>
</div>
 </div>
</article>
       </div>
   {/* END MESSAGE HEADER*/}
     <div className='column is-10 p-0 shadow mt-4'>
<article class="message is-dark">
  <div class="message-body lh-sm">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
  </div>
</article>
       </div>
       {/* END MESSAGE CONTENT */}

     <div className='column is-10 p-0 shadow mt-4 box'>
<form className='is-flex is-flex-column is-flex-gap-md p-5'>
<h5 className='title is-title is-3 '>Send Message</h5>
 <div class="field">
     <label class="label is-title">Subject</label>
  <p class="control has-icons-left has-icons-right">
    <input class="input is-medium is-info" type="text" name='subject' />
    <span class="icon is-small is-left">
      <i class="fa fa-paper-plane-o"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fa fa-check"></i>
    </span>
  </p>
</div>

<div class="field">
<label class="label is-title">Message</label>
  <div class="control">
    <textarea class="textarea is-medium  is-info" ></textarea>
  </div>
</div>

<div class="file has-name is-boxed is-info">
  <label class="file-label">
    <input class="file-input" type="file" name="resume" />
    <span class="file-cta">
      <span class="file-icon">
        <i class="fa fa-camera"></i>
      </span>
      <span class="file-label">
        Choose a file…
      </span>
    </span>
    <span class="file-name">
      Screen Shot 2017-07-29 at 15.54.25.png
    </span>
  </label>
</div>

<div class="field is-grouped is-grouped-right">
  <p class="control">
    <button type='submit' class="button is-info is-medium">
      Submit
    </button>
  </p>
</div>
     </form>
     </div>
       {/* END REPLY FORM */}

    </div>    
      </div>
    )
}
}

export default MessageDetail;