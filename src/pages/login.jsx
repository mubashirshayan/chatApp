import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { GlobalContext } from '../context/context';
export default function Login() {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let { state, dispatch } = useContext(GlobalContext);

    let submitValue = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/login", {
                email: email,
                password: password,
            }, {
                withCredentials: true,
            },
            )
            console.log(response)
            setUser(response)
            { localStorage.setItem("uid", response.data.user._id) }
            dispatch({
                type: "USER_LOGIN",
                payload: response.data.user,
            })
            setEmail(""),
                setPassword("")
        } catch (err) {
            console.log(err)
        }
    }







    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email"
                 onChange={(e)=>{
                                 setEmail(e.target.value)
                                    }} value={email} 
                required className="block w-full  p-3 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
      
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold  text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password"
                 onChange={(e)=>{
                                              setPassword(e.target.value)
                                    }} value={password}
                required className="block w-full p-3 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
             <br>
             </br>
            <div>
              <button type="submit" onClick={submitValue} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
         
      
          <p className="mt-10 text-center text-sm text-gray-500">
            Please Register your Account?
            <NavLink to={"/signup"}>Signup</NavLink>
          </p>
        </div>
      </div>


















        // <div className='row justify-content-center'>
        //     <div className='col-12 col-sm-12 col-md-8 col-lg-6'>
        //         <div className='card p-4 mt-4'>
        //             <div className="mb-3">

        //                 <h3>Login</h3>

        //                 <p>{state?.user?.email}</p>
        //                 <p>{state?.user?.phone}</p>
        //             </div>
        //             <div className="mb-3">
        //                 <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        //                 <input type="email" onChange={(e)=>{
        //                           setEmail(e.target.value)
        //                 }} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

        //             </div>
        //             <div className="mb-3">
        //                 <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        //                 <input type="password" onChange={(e)=>{
        //                           setPassword(e.target.value)
        //                 }} value={password} className="form-control" id="exampleInputPassword1" />
        //             </div>
        //             <button onClick={submitValue} className="btn btn-primary">Submit</button>
        //         </div>
        //         <p>please register your first?<NavLink to={"/register"}>Signup</NavLink></p>
        //     </div>

        // </div>
        
    )
}