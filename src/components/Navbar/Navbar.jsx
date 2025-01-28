import { useState, useEffect, useContext } from 'react';
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Api from "../../api/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");
    const {getTotalCartAmount} = useContext(StoreContext);
    const [searchVal, setSearchVal] = useState('');
    const {auth, setAlert, setAuth} = useContext(StoreContext)
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchVal(event.target.value); // Menyimpan input pencarian
      };
    
      const goToAllMenu = () => {
        // Mengarahkan ke explore-menu dengan query parameter searchTerm
        navigate(`/explore-menu?query=${searchVal}`);
      };

      const logout = async () => {
          
          await Api.post('/logout', {},{
              headers: {
                  'Authorization': `Bearer ${auth[1]}` // Kirim token Bearer dalam header
                }
            })
            .then((response) => {
                let message = response.data.message
                let code = response.status
                Cookies.remove('userName')
                Cookies.remove('authToken')
                
                setAuth([])
                setAlert([message, code])
                navigate('/');
            console.log('bisa logout',response)
        })
        .catch(error => {                
            //set errors response to state "errors"
            console.log('eror logout', error);
            
        })
    }
    
      
  return (
    <div className="navbar">
        <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <Link to='/explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</Link>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
        </ul>
        <div className="navbar-right">
            <div className='search-con'>
                <input type="text" className='search' placeholder='Search...'   
                value={searchVal} 
                onChange={handleInputChange}/>
            </div>
            <div className="navbar-search-icon">
                <Link to='/cart' onClick={()=>setMenu("cart")} className={menu==="cart"?"active":""}> <img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div> 
            {auth[0] ?
            <div className="auth">
                <div className="userName-login">Halo, {auth[0]}</div>
                <button onClick={logout} className="logout">Logout</button>
            </div>
            :    <button onClick={()=>setShowLogin(true)}>sign in</button>
            }
        </div>
            <ToastContainer  />
        


    </div>
  )
}

export default Navbar;