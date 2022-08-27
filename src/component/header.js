import React from 'react'
import { Link } from 'react-router-dom'
import '../header.css';

function Header(props){

    return(
      <header className='header py-2'>
<nav class="navbar mx-6" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
     <h2 className='is-size-3 has-text-dark has-text-weight-bold main-title'>
<Link to='/' className='has-text-dark pt-1'>
        Simple Sosmed
</Link>
     </h2>
    </a>

  </div>

<div className='mx-auto search'>
  <form className='is-flex mt-4'>
  <p class="control is-expanded">
    <input class="input has-text-dark" type="text" placeholder="Find a repository" />
  </p>
  <p class="control">
    <a class="button is-info">
      Search
    </a>
  </p>
  </form>
</div>


<div className='is-flex is-align-items-center p-0 m-0'>
<ul className='is-flex is-align-items-center mt-2 mx-2 right-nav'>
  <li className='navbar-item'><Link to='/'>
  <i  className="fa fa-home has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
</Link></li>
  <li className='navbar-item'><a href='#0'>
  <i className="fa fa-bell has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
  </a></li>
  <li className='navbar-item'><a href='#0' onClick={props.openModal}>
  <i className="fa fa-plus-square-o has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
  </a></li>
  <li className='navbar-item'><Link to='/message-list/'>
  <i className="fa fa-envelope-o has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
</Link></li>
</ul>

<ul className='is-flex is-align-items-center navbar-item has-dropdown is-hoverable mt-1 right-nav'>
<li className='mt-2'>
<figure className="image is-32x32">
  <img className="is-rounded avatar" src="https://bulma.io/images/placeholders/128x128.png" alt=''/> 
</figure>
</li>
<li className='navbar-item mx-0 px-0'><a href='#0' className='has-text-dark is-title navbar-link'>Username</a></li>
<ul class="navbar-dropdown">
<li className='navbar-item is-flex is-align-items-center is-flex-gap-sm'>
<i className="fa fa-user is-size-5" aria-hidden="true"></i> 
<Link to={`/profile/${props.id}`} className='has-text-dark pt-1'>
  Profile 
</Link>
</li>
<li className='navbar-item is-flex is-align-items-center is-flex-gap-sm'>
  <i className="fa fa-cog is-size-5" aria-hidden="true"></i>
<Link to={`/edit-profile/${props.id}`} className='has-text-dark pt-1'>
Setting
</Link>
</li>
 <hr class="dropdown-divider" />
<li className='navbar-item is-flex is-align-items-center is-flex-gap-sm'>
  <Link to='#' onClick={props.logout} className='has-text-dark  mx-3'>Log out</Link>
</li>
</ul>
</ul>

</div>
</nav>
        </header>
    )
}

export default Header;
