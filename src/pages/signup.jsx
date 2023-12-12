import { NavLink } from "react-router-dom";
import { useEffect, useState, useRef ,useContext} from "react";
import { GlobalContext } from '../context/context';
import axios from 'axios';


export default function Signup() {
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
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <form className="space-y-6" action="#" method="POST"> */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input  name="name" type="text" autoComplete="name" 
                                onChange={(e) => {
                                    setName(e.target.value)
                                }} value={name}
                                required className="block w-full  p-3 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                            <div className="mt-2">
                                <input id="phone" name="phone" type="number" autoComplete="phone" 
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                }} value={phone}
                                required className="block w-full  p-3 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email"
                                 onChange={(e) => {
                                    setEmail(e.target.value)
                                }} value={email}
                                required className="block w-full  p-3 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                 onChange={(e) => {
                                    setPassword(e.target.value)
                                }} value={password}

                                required className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 Class
                                Properties
                                p-3" />
                            </div>
                        </div>
                        <br>
                        </br>
                        <div>
                            <button  onClick={user}  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    {/* </form> */}
           
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an Account?
                        <NavLink to={"/login"}>Login</NavLink>
                    </p>
                </div>
            </div>


        </>)
}


