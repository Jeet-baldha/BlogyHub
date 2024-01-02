import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";


function App() {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then( (user) => {
        if(user){
          dispatch(login({user}));
        }
        else{
          dispatch(logout());
        }
      })
      .finally(
        setLoading(false)
      )
  },[])


    return !loading ? (
      <>
        <div className="min-h-screen flex flex-wrap content-between bg-gray-600 "> 
          <div className='w-full block '>
           <Header/>
           <main>
           Hello
            {/* <outlet></outlet> */}
           </main>
           <Footer/>
          </div>
        </div>
      </>
    ) : (
      <div>loading...</div>
    )

}

export default App
