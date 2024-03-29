import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/config'
import appwrite from  '../../appwrite/auth'


function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
       appwrite.logout().then(() => {
        dispatch(appwrite.logout());
       })
    }
  return (
    <button className='inline-block px-6 py-6 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn