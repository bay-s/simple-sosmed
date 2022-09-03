import React from 'react'
import { Link } from 'react-router-dom';
import img from '../akun.jpg'
import {database,auth} from '../firebase';
import { collection, getDocs,query, where,doc, deleteDoc,updateDoc,arrayUnion,arrayRemove} from 'firebase/firestore';

class FollowerCard extends React.Component{
constructor(){
    super()
    this.state = {
        follower:[]
    }
}


async componentDidMount(){
    const follower_id = this.props.follow_id

    const follower = collection(database,'user')
    const queryUser = query(follower,where("uid","==" , follower_id ))
                  // GET FOLLOWER
                  await getDocs(queryUser).then(res => {
                    res.docs.map(item => {
                      const data = item.data()
                        this.setState({follower:this.state.follower = data})
                        });
                      })
}

async componentDidUpdate(){
    const follower_id = this.props.follow_id

    const follower = collection(database,'user')
    const queryUser = query(follower,where("uid","==" , follower_id ))
                  // GET FOLLOWER
                  await getDocs(queryUser).then(res => {
                    res.docs.map(item => {
                      const data = item.data()
                        this.setState({follower:this.state.follower = data})
                        });
                      })
} 
    render(){

        return(
          this.props.follow_id == null ? <h4 className='text-center is-title is-6'>No follower yet</h4> : <div className='profiles is-flex is-justify-content-space-between is-align-items-center mx-3'>
<div className='is-flex align-center is-flex-gap-md'>
<figure class="image image is-32x32 avatar">
<Link to={`/account/${this.state.follower.uid}`}>
<img class="is-rounded" src={this.state.follower.images != null ? this.state.follower.images : img}  alt='' /> 
</Link>
</figure>
<div className='username is-flex is-flex-direction-column is-align-items-start is-flex-gap-sm'>
 <h4 className='is-size-7 has-text-weight-bold is-title'><Link to={`/account/${this.state.follower.uid}`} className='has-text-dark'>{this.state.follower.fullname}</Link></h4>
 <h5 className='is-size-7 has-text-weight-normal '>@{this.state.follower.username}</h5>
</div>
</div>
</div>
             )
    }
}

export default FollowerCard;

