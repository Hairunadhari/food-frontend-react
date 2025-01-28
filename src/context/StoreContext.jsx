import { createContext, useEffect, useState } from "react";
import Api from '../api/index';
export const StoreContext = createContext(null);
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
     // Fungsi untuk mendapatkan data dari API
     const fetchFoodList = async () => {
        try {
            const response = await Api.get('/produk'); // Asumsi Api sudah dikonfigurasi
            setFoodList(response.data.data.items); // Sesuaikan dengan struktur respons API Anda
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    };

    const [category, setCategory] = useState([]);
     // Fungsi untuk mendapatkan data dari API
     const fetchCategory = async () => {
        try {
            const response = await Api.get('/kategori'); // Asumsi Api sudah dikonfigurasi
            setCategory(response.data.data.items); // Sesuaikan dengan struktur respons API Anda
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    };

    const [auth, setAuth] = useState([])
    const storeAuth = () => {
        const getUserName = Cookies.get('userName');
        const getToken = Cookies.get('authToken');
        if (getUserName && getToken) {
            
            setAuth([getUserName, getToken])
        }

    }

    const [alert, setAlert] = useState([])
    const notify = ()=>{
        // setAlert([text,code])
        toast(alert[0]);
    }
    const [cartItems, setCartItems] = useState({})
    const addToCart = (itemId) => {
        if (auth.length === 0) {
            setAlert(['Silahkan Login Dulu'])
        }else{

            if (!cartItems[itemId]) {
                setCartItems((prev)=>({...prev,[itemId]:1}))
            }else{
                setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            }
        }
    }
    // console.log(cartItems)
    
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item] > 0) {
                
                let itemInfo = food_list.find((product)=>product.id);
                console.log(food_list.find((product)=>product.id));
                totalAmount += itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    
    
   
    
    useEffect(() => {
        fetchFoodList();
        fetchCategory();
        storeAuth()
        
    }, []);

    useEffect(() => {
        notify(); // Panggil fungsi notify saat `alert` berubah
        console.log(alert)
    }, [alert]);

    
    
    const contextValue = {
        food_list,
        category,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        auth,
        alert,
        setAuth,
        setAlert
        // province
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;