

import React, { useState } from 'react';
import { useDispatchCart,useCart } from './ContextReducer';

function Card({ foodItem}) {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("half"); 
    let dispatch = useDispatchCart();
    let data = useCart();

    // Calculate total price based on quantity and size
    const calculateTotalPrice = () => {
        let priceMultiplier = size === "full" ? 2 : 1; // Full-size price is double
        return foodItem.price * quantity * priceMultiplier;
    }; 

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
          if (item.id === foodItem._id) {
            food = item;
    
            break;
          }
        }
        console.log(food)
        console.log(new Date())
        if (food && Object.keys(food).length > 0) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: foodItem._id, price: calculateTotalPrice(), quantity: quantity })
            return
          }
          else if (food.size !== size) {
            await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: calculateTotalPrice(), quantity: quantity, size: size,img: foodItem.img })
            console.log("Size different so simply ADD one more to the list")
            return
          }
          return
        }
    
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: calculateTotalPrice(), quantity: quantity, size: size })
    
    
        // setBtnEnable(true)
    
    }

    return (
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
            <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: "150px", objectFit: "cover" }} />
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                
                <p className="card-text">₹{foodItem.price}</p>
                <div className="container w-100">
                    {/* Quantity Selector */}
                    <select className="m-2 h-100 bg-success rounded" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                        {Array.from(Array(6), (e, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    {/* Size Selector */}
                    <select className="m-2 h-100 bg-success rounded" value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="half">Half</option>
                        <option value="full">Full</option>
                    </select>

                    {/* Display Total Price */}
                    <div className="d-inline">
                        <strong>₹ {calculateTotalPrice()}</strong>
                    </div> 
                    <hr></hr>
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
