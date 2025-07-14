const express=require("express");
const {Productmodel}=require("../model/product.model")
const productRouter=express.Router();
const mongoose=require("mongoose");
const { Refundmodel } = require("../model/refund.model");
const { Authentication } = require("../middleware/Authentication");
const { Usermodel } = require("../model/user.model");


productRouter.get("/all",async(req,res)=>{
        try{
            const allProduct=await Productmodel.find();
            res.status(200).send(allProduct)
        }
        catch(err) {
            res.status(500).send({"msg":err.message})
        }
})


productRouter.get("/", async (req, res) => {
  const { category, brand, filter } = req.query;
  const sorting = parseInt(filter) || 1;

  try {
    let query = {};

    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] };
    }

    if (brand) {
      query.brand = brand;
    }

    const product_data = await Productmodel.find(query).sort({ cost: sorting });

    res.status(200).send({ products: product_data });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});




productRouter.get("/search",async(req,res)=>{

    const {q,page,category,brand}=req.query;

     const showpage=(page-1)*12
        try{
            let alldata;
          if(category&&brand){
    
            alldata=await Productmodel.find({title: new RegExp(q,"i"),category,brand}).skip(showpage||0).limit(12)
          }else if(category){
            alldata=await Productmodel.find({title: new RegExp(q,"i"),category}).skip(showpage||0).limit(12)
          }else if(brand){
            alldata=await Productmodel.find({title: new RegExp(q,"i"),brand}).skip(showpage||0).limit(12)
          }else{
            alldata=await Productmodel.find({title: new RegExp(q,"i")}).skip(showpage||0).limit(12)
          }
            res.status(200).send(alldata)
        }catch(err){
            res.status(400).send({"msg":err.message})
        }
})


productRouter.get("/category", async (req, res) => {
  try {
    const categories = await Productmodel.distinct("category");
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});



productRouter.get("/:productid",async(req,res)=>{
        const productid=req.params.productid
        try{
            const product=await Productmodel.findOne({_id:productid})
            if(Object.keys(product).length>1){
                res.status(200).send(product)
            }else{
                res.status(404).send({"msg":"Product not found"})
            }
        }catch(err){
            res.status(404).send({"msg":err.message})
        }
})



productRouter.post("/refund",Authentication,async(req,res)=>{
    const userid=req.body.userid
    const {productId,orderId}=req.body;

    try{
        const user=await Usermodel.findOne({_id:userid});
      
        if(user?._id){
           
                const data=await Refundmodel({product:productId,order:orderId,user:userid})
                await data.save();
                res.status(200).send({msg:"Refund Request Added Successfully"})
           
        }else{
            res.status(404).send({"msg":"Not authenticated"})
        }
    }catch(err){
        res.status(404).send({msg:err.message})
    }
})






module.exports={productRouter}
