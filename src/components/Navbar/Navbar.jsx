import { useState, useEffect, useContext } from 'react';
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [menu,setMenu] = useState("home");
    const {getTotalCartAmount} = useContext(StoreContext);
    const [searchVal, setSearchVal] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchVal(event.target.value); // Menyimpan input pencarian
      };
    
      const goToAllMenu = () => {
        // Mengarahkan ke explore-menu dengan query parameter searchTerm
        navigate(`/explore-menu?query=${searchVal}`);
      };
      
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
                <img src={assets.search_icon} alt="" onClick={()=>goToAllMenu()} />
            </div>
            <div className="navbar-search-icon">
                <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>sign in</button>
        </div>
    </div>
  )
}

export default Navbar;