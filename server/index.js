const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const ProductRouter = require('./routes/ProductRoutes');
const UserRouter = require('./routes/UserRoutes');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRoutes');
const CartRouter = require('./routes/CartRoutes');
const OrderRouter = require('./routes/OrderRoutes');

dotenv.config();

const port = process.env.PORT_NUMBER;
const databaseUrl = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//connection  with database
const main = async()=>{
    try{
       await mongoose.connect(databaseUrl);
        console.log("Connected")
    }
    catch(error){
        console("Database is not connected");
    }
}

main();

app.use('/products', ProductRouter);
app.use('/auth', AuthRouter);
app.use('/users', UserRouter);
app.use('/carts', CartRouter);
app.use('/orders',OrderRouter);



app.listen (port, ()=> console.log("server started"))