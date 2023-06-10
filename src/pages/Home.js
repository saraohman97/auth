import React, { useContext } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Home = () => {
  const { dispatch, currentUser } = useContext(AuthContext)

  const logout = () => {
    signOut(auth).then(() => {
      dispatch({type: "LOGOUT", payload: currentUser})
    }).catch((error) => {
      console.log('error')
    });
  }

  return (
    <div>You are logged in. <br />
    
    <Link to='/new'><button>Create new post</button></Link> <br />
    <Link to='/list'><button>Listed items</button></Link> <br />
    <button onClick={logout}>Sign out</button>
    </div>
  )
}

export default Home