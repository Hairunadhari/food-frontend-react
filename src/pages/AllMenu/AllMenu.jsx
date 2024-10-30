import React, { useContext,useState, useEffect } from "react";
import {StoreContext} from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';
import './AllMenu.css';
import { useLocation } from 'react-router-dom';

const AllMenu = () => {
  const { food_list } = useContext(StoreContext); // Data makanan dari konteks
  const location = useLocation(); // Mendapatkan query string dari URL
  const [filteredFoodList, setFilteredFoodList] = useState(food_list); // Menyimpan hasil pencarian
  const [searchVal, setSearchVal] = useState('');
  const [sortPrice, setSortPrice] = useState('low-to-high');

  useEffect(() => {
    // Mendapatkan nilai query dari URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    setSearchVal(query || '');

    let filteredList = [...food_list];
  
   // Filter data makanan berdasarkan searchVal (query)
   if (query) {
    filteredList = filteredList.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }
    
    // Buat salinan food_list untuk memanipulasi datanya tanpa mengubah array asli

    // Urutkan berdasarkan harga
    if (sortPrice === "low-to-high") {
      // Dari harga rendah ke tinggi
      filteredList.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "high-to-low") {
      // Dari harga tinggi ke rendah
      filteredList.sort((a, b) => b.price - a.price);
    }
     // Set hasil yang sudah diurutkan ke state
  setFilteredFoodList(filteredList);
  }, [location.search, food_list, sortPrice]); // Efek dijalankan setiap kali lokasi berubah
  

    return (
      <div className="food-display" id="food-display">
        <div className="filter">
      <h2>All Menu</h2>
      <select name="sortPrice"
          id="sortPrice"
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}>
        <option value="low-to-high">Sort by price : low to high</option>
        <option value="high-to-low">Sort by price : high to low</option>
      </select>
        </div>
      <div className="food-display-list">
        {filteredFoodList.map((item,index)=>{
          
          return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} />
        })}
      </div>
 </div>
  )
}

export default AllMenu;