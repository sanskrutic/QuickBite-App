import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export default function Checkout({ userId, cartItems, totalAmount }) {
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on("order-status", (data) => {
            if (data.userId === userId) {
                setNotifications((prev) => [...prev, data.message]);
            }
        });

        return () => {
            socket.off("order-status");
        };
    }, [userId]);

    const handlePayment = async () => {
        if (paymentMethod === "upi") {
            try {
                const response = await axios.post("http://localhost:5001/api/upi-payment", {
                    amount: totalAmount,
                    currency: "INR"
                });

                if (response.data.success) {
                    alert("Payment Successful! Order Confirmed.");
                    socket.emit("order-status", { userId, message: "Order Confirmed" });
                }
            } catch (error) {
                console.error("UPI Payment Failed:", error);
            }
        } else {
            try {
                await axios.post("http://localhost:5001/api/cod", {
                    userId,
                    items: cartItems,
                    totalAmount
                });

                alert("Order placed successfully with Cash on Delivery!");
                socket.emit("order-status", { userId, message: "Order Confirmed" });
            } catch (error) {
                console.error("COD Order Failed:", error);
            }
        }
    };

    return (
        <div>
            <h2>Choose Payment Method</h2>
            <label>
                <input type="radio" value="upi" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                UPI
            </label>
            <label>
                <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                Cash on Delivery
            </label>

            <button onClick={handlePayment}>Proceed to Pay</button>

            <h3>Notifications</h3>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
}
