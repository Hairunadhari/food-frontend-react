import { createContext, useEffect, useState } from "react";
import {food_list} from '../assets/assets';
import Api from '../api/index'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item] > 0) {
                
                let itemInfo = food_list.find((product)=>product.id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

      // State untuk data provinsi
    const [province, setProvince] = useState([]);

    // Fetch data provinsi
    const fetchDataProvince = () => {
        Api.get('/api/province')
            .then((response) => {
                setProvince(response.data.rajaongkir.results);
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    };

    // Mengambil data provinsi saat komponen dimuat pertama kali
    useEffect(() => {
        fetchDataProvince();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        province
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;