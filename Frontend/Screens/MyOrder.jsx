import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            console.log("Fetching orders for:", userEmail);
    
            if (!userEmail) {
                console.error("No user email found in localStorage");
                return;
            }
    
            const res = await fetch("http://localhost:5001/api/myOrderData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
            });
    
            console.log("Raw Response:", res); // ✅ Check if response is received
    
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const response = await res.json();
            console.log("API Response:", response); // ✅ Check actual data
    
            if (response.orderData) {
                setorderData(response.orderData);
            } else {
                console.warn("No order data found");
                setorderData([]); // Prevents errors
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };
    

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data ? (
                        orderData.order_data.map((order, index) => {
                            // Filter out non-array elements
                            if (!Array.isArray(order)) return null;

                            return (
                                <div key={index} className="col-12">
                                    {order.map((item, i) => {
                                        if (typeof item === 'object' && item.Order_date) {
                                            return (
                                                <div key={i} className='m-auto mt-5'>
                                                    <h5>Order Date: {item.Order_date}</h5>
                                                    <hr />
                                                </div>
                                            );
                                        } else if (typeof item === 'object') {
                                            return (
                                                <div key={i} className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>Qty: {item.quantity}</span>
                                                                <span className='m-1'>Size: {item.size}</span>
                                                                <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                                    ₹{item.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            );
                        })
                    ) : (
                        <h4>No Orders Found</h4>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}