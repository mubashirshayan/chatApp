import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import { useContext,useEffect } from "react";

import Login from "../pages/login";
import Chat from "../pages/chat";
import Profile from "../pages/profile";
import Signup from "../pages/signup";
import { GlobalContext } from "../context/context";
import axios from "axios";



function AppRouter() {
     let { state, dispatch } = useContext(GlobalContext);
    useEffect(()=>{
        async function checkIsLogin(){
         try{
       const response=await axios.get("http://localhost:8000/api/v1/profile",{
             withCredentials:true,
         })
       dispatch({
         type:"USER_LOGIN",
         payload:response.data.data,
       })

     }
     catch(error){
         console.log(error)
         dispatch({
             type:"USER_LOGOUT" 
         })
     }
          }
         checkIsLogin()
     },[])
    
    return (
       <>
          {/* <Routes>
                <Route path="/" element={<Chat/>} />
                 <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </Routes> */}

          {state.isLogin?(  
            
          <Routes>
                <Route path="/" element={<Chat/>} /> 
                <Route path="/profile" element={<Profile/>} />
             <Route path="*" element={<Navigate to="/" replace={true}/>} />
            </Routes>):(<Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="*" element={<Navigate to="/login" replace={true}/>} />
            </Routes>)
            }
          
        </>
    )
}

export default AppRouter;