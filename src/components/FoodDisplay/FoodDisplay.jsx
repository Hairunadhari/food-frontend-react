import React, { useContext, useEffect, useState } from "react";
import './FoodDisplay.css';
import {StoreContext} from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const {food_list} = useContext(StoreContext);
  if (!food_list.length) {
    return <div>Loading</div>
  }
  return (
   <div className="food-display" id="food-display">
        <h2>Top disher near you</h2>
        <div className="food-display-list">
          {food_list.map((item,index)=>{            
            return <FoodItem key={index} id={item.id} name={item.name} description={item.desc} price={item.price} image={`http://127.0.0.1:8000/storage/image/${item.image}`} />
          })}
        </div>
   </div>
  )
}

export default FoodDisplay;