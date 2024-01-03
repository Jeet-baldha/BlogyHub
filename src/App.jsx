import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer";
import { Container, Logo, LogoutBtn } from './components';
import Input from './components/Input';
import Button from './components/Button';



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
        
          <Container>
          <Logo></Logo>
            <Input label="Email"></Input>
            <Input label="Password" type="password"></Input>
            <Button>Login</Button>
          </Container>
          
      </>
    ) : (
      <div>loading...</div>
    )

}

export default App
