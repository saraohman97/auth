import React, { useContext } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext'

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
    
    <button onClick={logout}>Sign out</button>
    </div>
  )
}

export default Home