const express = require("express");
const app = express();
const http = require("http");
const port = 5001;
const mongoDB = require("./db");
const cors = require("cors");

// Initialize MongoDB connection
mongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
}) 


app.use(cors()); 
app.use(express.json()) 



setImmediate(() => {
app.use('/api/', require('./Routes/CreateUser'));
app.use('/api/', require('./Routes/DisplayData'));
app.use('/api/', require('./Routes/OrderData'));
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
