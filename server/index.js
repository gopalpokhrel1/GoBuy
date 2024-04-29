const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const ProductRouter = require('./routes/ProductRoutes');
const UserRouter = require('./routes/UserRoutes');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRoutes');
const CartRouter = require('./routes/CartRoutes');
const OrderRouter = require('./routes/OrderRoutes');

dotenv.config({path:"./.env"});

const port = process.env.BASE_URL || process.env.PORT_NUMBER;
const databaseUrl = process.env.DATABASE_URL;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//connection  with database
const main = async()=>{
    try{
       await mongoose.connect(databaseUrl);
        console.log("Connected")
    }
    catch(error){
        console("Database is not connected");
        process.exit(1);
    }
}

main();

app.get('/',(req,res)=>{
    res.send("Hello from hosted server!!")
})

app.use('/products', ProductRouter);
app.use('/auth', AuthRouter);
app.use('/users', UserRouter);
app.use('/carts', CartRouter);
app.use('/orders',OrderRouter);



app.listen (port, ()=> console.log("server started"))