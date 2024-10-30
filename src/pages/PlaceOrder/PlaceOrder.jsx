import React, { useContext,useState, useEffect } from "react";
import './PlaceOrder.css';
import {StoreContext} from '../../context/StoreContext';
import Api from "../../api";
const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext);
  const { province } = useContext(StoreContext); // Data makanan dari konteks
  const [city, setCity] = useState([]);
  
  // Fungsi untuk mengambil data kota berdasarkan ID provinsi terpilih
  const fetchCityByProvince = async (provinceId) => {
    try {
        const response = await Api.get(`/api/cityByProvince/${provinceId}`);
        setCity(response.data.rajaongkir.results);
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
  };

  // Event handler ketika provinsi dipilih
  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    fetchCityByProvince(selectedProvinceId); // Fetch data kota berdasarkan ID provinsi terpilih
  };

  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Phone" />
        <input type="email" placeholder="Email addres" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <select name="" id=""  onChange={handleProvinceChange}>
            <option value="">Pilih Provinsi</option>
            {province.map((prov, index) => (

              <option value={prov.province_id} key={index}>{prov.province}</option>
            ))}
          
          </select>
          <select name="" id="">
            <option value="">Pilih Kota</option>
            {city.map((city, index) => (
                <option value={city.city_id} key={index}>{city.city_name}</option>
            ))}
          </select>
        </div>
        
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
            <button>PROCED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;