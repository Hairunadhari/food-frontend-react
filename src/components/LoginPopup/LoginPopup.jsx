import React, { useContext, useState } from "react";
import './LoginPopup.css';
import {assets} from '../../assets/assets';
import Api from "../../api/index";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import Cookies from 'js-cookie';


const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = useState("Sign Up")
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_Password] = useState('');
    const [loading, setLoading] = useState(false)
    const {setAlert, setAuth} = useContext(StoreContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        //init FormData
        const formData = new FormData();

        if (currState === 'Sign Up') {
            
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirm_password', confirm_password);
    
            //send data with API
            await Api.post('/register', formData)
                .then((response) => {
                    let message = response.data.message
                    let statusCode = response.status
                    setAlert([message,statusCode]);
                
                    setCurrState("Login")
                    console.log('bisa',response)
                })
                .catch(error => {                
                    //set errors response to state "errors"
                    let message = error.response.data.message;
                    let statusCode = error.response.status
                    setAlert([message,statusCode]);
                    console.log('eror', error);
                    
                })
        }else{
            formData.append('email', email);
            formData.append('password', password);
    
            //send data with API
            await Api.post('/login', formData)
                .then((response) => {
                    let message = response.data.message
                    let token = response.data.user.token
                    let userName = response.data.user.name
                    let statusCode = response.status
                    setShowLogin(false)

                    Cookies.set('userName', userName, { expires: 1 }); // Token akan bertahan selama 1 hari
                    Cookies.set('authToken', token, { expires: 1 }); // Token akan bertahan selama 1 hari
                    setAlert([message,statusCode]);
                    setAuth([userName, token])
                
                    console.log('bisa login',response)
                })
                .catch(error => {                
                    //set errors response to state "errors"
                    let message = error.response.data.message
                    let statusCode = error.response.status
                    setAlert([message,statusCode]);
                    console.log('eror login', error);
                    
                })
        }
        setLoading(false);
    }
  return (
    <div className="login-popup">
        <form onSubmit={handleSubmit} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

        {loading === false ? 
            <div className="container-body" id="container-body">
                <div className="login-popup-inputs">
                    {currState==='Login'?<></>:<input type="text" onChange={(e) => setName(e.target.value)} name="fullname" placeholder="Your Name" required />}
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    {currState==='Login'?<></>:<input type="password" onChange={(e) => setConfirm_Password(e.target.value)} name="confirm_password" placeholder="Confirm" required />}
                </div>
                <button type="submit">{currState==='Sign Up'?'Create account':'login'}</button>
            
                {currState==='Login'
                    ? <p>create new account? <span onClick={()=>setCurrState("Sign Up")}>click here</span></p>
                    : <p>already have an account? <span onClick={()=>setCurrState("Login")}>login here</span></p>
                }
            </div>
        :  <span className="loader"></span>}

        </form>
    </div>
  )
}

export default LoginPopup;