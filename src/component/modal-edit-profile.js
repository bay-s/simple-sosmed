import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../default.jpg";
import { database} from "../firebase";
import {doc,updateDoc} from "firebase/firestore";


class ModalProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      checkFormBio:false,
      checkFormWeb:false,
      checkFormUser:false,
      checkFormName:false,
      username: "",
      fullname:"",
      website: "",
      bio: "",
    };
  }

  inputTxt = (e) => {
    const { name, value } = e.target;
    const checkBio = this.state.bio.length > 7 ? this.setState({ checkFormBio:this.state.checkFormBio = true}) :    this.setState({ checkFormBio:this.state.checkFormBio = false})
    const checkWeb = this.state.website.length > 7 ? this.setState({ checkFormWeb:this.state.checkFormWeb = true}) :    this.setState({ checkFormWeb:this.state.checkFormWeb = false})
    const checkUser = this.state.username.length > 7 ? this.setState({ checkFormUser:this.state.checkFormUser = true}) :    this.setState({ checkFormUser :this.state.checkFormUser  = false})
    const checkName = this.state.fullname.length > 7 ? this.setState({ checkFormName:this.state.checkFormName = true}) :    this.setState({ checkFormName:this.state.checkFormName = false})
    
    this.setState((prev) => {
      return {
        [name]: value,
      };
    });
  };

  updateName = (e) => {
    e.preventDefault()
    const id = this.props.id;
    const docUpdate = doc(database, "user", id);
    this.setState({checkFormName:this.state.checkFormName = false})

        // UPDATE USER INFO
        updateDoc( docUpdate, {fullname: this.state.fullname})
                .then(() => {
                  alert("update sukses")
                  window.location.reload()
                })
                .catch((err) => {
                  alert(err.message);
        });  
}  

  updateUsername = (e) => {
    e.preventDefault()
    const id = this.props.id;
    const docUpdate = doc(database, "user", id);
    this.setState({checkFormUser:this.state.checkFormUser = false})

        // UPDATE USER INFO
        updateDoc( docUpdate, {username: this.state.username})
                .then(() => {
                  alert("update sukses")
                  window.location.reload()
                })
                .catch((err) => {
                  alert(err.message);
        });  
  }  

  updateWebsite = (e) => {
    e.preventDefault()
    const id = this.props.id;
    console.log(id);
    const docUserUpdate = doc(database, "user-info", id);
            // UPDATE USER INFO
            this.setState({ checkFormWeb:this.state.checkFormWeb = false})
            updateDoc( docUserUpdate, {website: this.state.website})
                    .then(() => {
                      alert("update sukses")
                      window.location.reload()
                    })
                    .catch((err) => {
                      alert(err.message);
            });  

}  

  updateBio = (e) => {
    e.preventDefault()
    const id = this.props.id;
    const docUserUpdate = doc(database, "user-info", id);

        // UPDATE USER INFO
        this.setState({ checkFormBio:this.state.checkFormBio = false})
        updateDoc( docUserUpdate, {bio: this.state.bio})
                .then(() => {
                  alert("update sukses")
                  window.location.reload()
                })
                .catch((err) => {
                  alert(err.message);
        });  
    
  }  
  
  render() {
    return (
      <div className="modal-containers">
        <div className="forms-container">
          <div className="modal-left">
            <ul className="form-list">
              <li>
                <a href="#0">Edit Profile</a>
              </li>
              <li>
                <a href="#0" onClick={this.props.logout}>
                  Log out
                </a>
              </li>
            </ul>
          </div>
          <div className="modal-form">
            <form className="input-judul" onSubmit={this.props.changeAvatar}>
 <div className="judul-inner">
 <div className="judul-left">
                <img
                  src={this.props.images.length < 1 ? logo : this.props.images}
                />
                <h3 className="name">
                  <Link to={`/account/${this.props.id}`}>
                    {this.props.username}
                  </Link>
                </h3>
              </div>
      <div className="change-avatar">
        <div className="input-container">
                <label htmlFor="upload-photos" className="upload-photos">
                  Change Profile Photo
                </label>
                <input
                  type="file"
                  name="photos"
                  id="upload-photos"
                  onChange={this.props.changeImg}
                />
              </div>
        </div>
 </div>
{!this.props.save ? "" : <div className="button-container">
<a href="#0"  className="cancel" onClick={this.props.removeModal}>
    Cancel
</a>
<button type="submit" className="sign-up-with">
    Done
</button>
</div>}
            </form>
            {/* END FORM CHANGE AVATAR */}
            <form className="form-bio" onSubmit={this.updateName}>
<div className="input-container">
              <label>{this.props.name}</label>
              <input
                type="text"
                name="fullname"
                placeholder="name"
                onChange={this.inputTxt}
              />
</div>
{!this.state.checkFormName ? "" : <div className="button-container">
<a href="#0"  className="cancel" onClick={this.props.removeModal}>
    Cancel
</a>
<button type="submit" className="sign-up-with">
    Done
</button>
</div>}
</form>
            {/* END FORM FULLNAME */}
<form className="form-bio" onSubmit={this.updateUsername}>
<div className="input-container">
              <label>{this.props.username}</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={this.inputTxt}
              />
</div>
{!this.state.checkFormUser ? "" : <div className="button-container">
<a href="#0"  className="cancel" onClick={this.props.removeModal}>
    Cancel
</a>
<button type="submit" className="sign-up-with">
    Done
</button>
</div>}
</form>
            {/* END FORM USERNAME */}
        <form className="form-bio" onSubmit={this.updateWebsite}>
        <div className="input-container">
           <label>Website</label>
              <input
                type="text"
                name="website"
                placeholder="website"
                onChange={this.inputTxt}
              />
           </div>
           {!this.state.checkFormWeb ? "" : <div className="button-container">
<a href="#0"  className="cancel" onClick={this.props.removeModal}>
    Cancel
</a>
<button type="submit" className="sign-up-with">
    Done
</button>
</div>}
            </form>
            {/* END FORM WEBSITE */}
            <form className="form-bio" onSubmit={this.updateBio}>
              <div className="input-container">
              <label>Bio</label>
              <textarea
                className="textarea"
                name="bio"
                placeholder="biodata"
                onChange={this.inputTxt}
              ></textarea>
              </div>
{!this.state.checkFormBio ? "" : <div className="button-container">
<a href="#0"  className="cancel" onClick={this.props.removeModal}>
    Cancel
</a>
<button type="submit" className="sign-up-with">
    Done
</button>
</div>}
            </form>
            {/* END FORM BIO */}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalProfile;

// onSubmit={this.props.Submit}
// <div className="button-container">
//   <button type="submit" className="cancel">
//     Cancel
//   </button>
//   <button type="submit" className="sign-up-with">
//     Done
//   </button>
// </div>