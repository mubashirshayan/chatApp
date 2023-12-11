import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef ,useContext} from "react";
import { GlobalContext } from '../context/context';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState('')
    const [data, setData] = useState('')
    let { state, dispatch } = useContext(GlobalContext);
    async function user() {
        
     
try{
    let response= await axios.post("http://localhost:8000/api/v1/user/signup", {
    name: name,
    password: password,
    email: email,
    phone: phone,
}, {
    withCredentials: true,
})
       {var uid=localStorage.setItem("uid",response.data.newUser._id)}
     setData(response.data)
     dispatch({
        type: "USER_LOGIN",
        payload: response.data.newUser
      })
     //console.log(response.data.newUser)
   
      
setName('');
setEmail('');
setPassword('');
setPhone('');}catch(error){
console.log(error.message)
}
    }
    // )}
    useEffect(()=>{
       async function checkIsLogin(){
        try{
        const response=await axios.get("http://localhost:8000/api/user/v1",{
            withCredentials:true,
        })
      dispatch({
        type:"USER_LOGIN",
      })
    }
    catch(error){
        console.log(error.massage)
        dispatch({
            type:"USER_LOGOUT" 
        })
    }
        }
    },[])
    



    return (
        <div className='row justify-content-center'>
            <div className='col-12 col-sm-12 col-md-8 col-lg-6'>
                <div className='card p-4 mt-4'>
                    <div className="mb-3"   >
                        <h3>Register</h3>
                       
                        <p>{state?.user?.email}</p>
                        <p>{state?.user?.phone}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputname" className="form-label">Full Name</label>
                        <input type="text" onChange={(e) => {
                            setName(e.target.value)
                        }} value={name} className="form-control" id="exampleInputname" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputphone" className="form-label">Phone</label>
                        <input type="number" onChange={(e) => {
                            setPhone(e.target.value)
                        }} value={phone} className="form-control" id="exampleInputphone" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} value={password} className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button onClick={user} className="btn btn-primary">Submit</button>
                </div>
            </div>
          
        </div>
    )
}
