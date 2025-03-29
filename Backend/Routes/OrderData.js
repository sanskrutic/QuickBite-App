const express = require('express')
const router = express.Router()  
const Order = require('../models/Orders') 

router.post("/orderData", async (req, res) => {
    try {
        const { order_data, email, paymentMethod, order_date } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "User email is required" });
        }

        let newOrderData = [...order_data]; // Copy order data
        newOrderData.unshift(0, 0, { Order_date: order_date });

        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            await Order.create({
                email,
                order_data: [newOrderData],
                paymentMethod
            });
        } else {
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: newOrderData } }
            );
        }

        return res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
    

});

module.exports = router;