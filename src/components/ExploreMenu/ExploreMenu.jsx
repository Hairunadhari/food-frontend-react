import React, { useContext, useState } from "react";
import './ExploreMenu.css';
import {StoreContext} from '../../context/StoreContext';

const ExploreMenu = () => {
     const {category} = useContext(StoreContext);
      if (!category.length) {
        return <div>Loading</div>
      }
  return (
    <div className="explore-menu" id="explore-menu">
        <h1>Explore Our Menu</h1>
        <p className="explore-menu-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat iusto, dolore accusamus possimus ipsam cupiditate.</p>
        <div className="explore-menu-list">
            {category.map((item,index) => {
                return(
                    <div key={index} className="explore-menu-list-item">
                        <img className={category===item.kategori?"active":""} src={`http://127.0.0.1:8000/storage/image/${item.image}`} alt="" />
                        <p>{item.kategori}</p>
                    </div>
                )
            })}
        </div>
        <hr />
     </div>
  )
}

export default ExploreMenu;