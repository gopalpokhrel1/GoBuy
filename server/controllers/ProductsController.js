const {Product} = require('../models/ProductModel');


exports.createProducts = (req,res)=>{

    const product = new Product(req.body);
    product.save()
    .then(doc => {
        res.status(200).json(doc)
    }).catch(err => {
        res.status(200).json(err)
    })
}

exports.fetchAllProducts = async (req,res)=>{

    let query =  Product.find();

    if (req.query.category) {
        query = query.where('category').equals(req.query.category);
    }

    if (req.query.brand) {
        query = query.where('brand').equals(req.query.brand);
    }

    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]: req.query._order})
    }

    if(req.query._page && req.query._limit){
       const pageSize = req.query._limit;
       const page = req.query._page;
       query = query.skip(pageSize*(page-1)).limit(pageSize)
    }

    try{
        const docs = await query.exec();
        res.status(200).json(docs)
    }
    catch(error){
        res.status(400).json(error);
    }
}


exports.fetchSpecificProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findById(id);

        if (!data) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}


exports.updateProduct = async(req, res)=>{

    try{
        const {id} = req.params;
        const data = await Product.findByIdAndUpdate(id,req.body, {new:true});
        res.status(200).json(data);
    }
    catch(error){
        res.status(404).json({sucess:false})
    }
}

exports.deleteProduct =async(req, res)=>{
    console.log(req.params);
    try{
        const {id} = req.params;
        const data =  await Product.findByIdAndDelete(id);
        res.status(200).json(data);
    }
    catch(error){
        res.status(500);
    }
}

