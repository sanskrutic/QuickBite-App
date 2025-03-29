const express = require('express')
const router = express.Router() 

router.post('/food_data', (req,res)=>{
    try {
        if (!global.sample || !global.foodCategory) {
            return res.status(500).json({ error: "Data not found" });
        }
        
        res.json({ sample: global.sample, foodCategory: global.foodCategory });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
}) 

module.exports = router;