const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const http = require("http");

const app = express();


app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: "your_razorpay_key",
    key_secret: "your_razorpay_secret"
});

// **UPI Payment Route**
app.post("/api/upi-payment", async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const payment = await razorpay.orders.create({
            amount: amount * 100, // Razorpay works in paise
            currency: currency || "INR",
            payment_capture: 1
        });

        res.json({ success: true, orderId: payment.id });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// **Cash on Delivery Route**
app.post("/api/cod", (req, res) => {
    const { userId, items, totalAmount } = req.body;

    // Save order to DB (Assume MongoDB)
    const order = {
        userId,
        items,
        totalAmount,
        paymentMethod: "COD",
        status: "Confirmed"
    };

    // Emit real-time notification

    res.json({ success: true, message: "Order placed successfully via COD" });
});


// **Order Status Update Route**
app.post("/api/order-status", (req, res) => {
    const { userId, status } = req.body;

    res.json({ success: true, message: `Notification sent: ${status}` });
});
