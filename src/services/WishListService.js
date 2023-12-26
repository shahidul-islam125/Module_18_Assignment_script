const WishModel = require("../models/WishModel");
const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId;

exports.SaveWishListService = async(req) =>{
    try {
        const user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = user_id;

        await WishModel.updateOne(reqBody, {$set:reqBody }, {upsert: true} );
        return {status:"success",message:"Wish List Save Success"}


    } catch (error) {
        return {status:"fail",message:"Something Went Wrong !"}
    }


}

exports.RemoveWishListService = async(req) =>{
    try {
        const user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = user_id;
        
        await WishModel.deleteOne(reqBody);
        return {status:"success",message:"Wish List Remove Success"}


    } catch (error) {
        return {status:"fail",message:"Something Went Wrong !"}
    }
}


exports.WishListService = async(req) =>{
    try {
      const user_id = new ObjectID(req.headers.user_id);
      const MatchStage = {$match: {userID: user_id }};

      const JoinProductStage = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}}
      const UnwindProductStage ={$unwind: "$product"};

      const JoinBrandStage = {$lookup: {from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"}}
      const UnwindBrandStage ={$unwind: "$brand"};

      const JoinCategoryStage = {$lookup: {from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category"}}
      const UnwindCategoryStage ={$unwind: "$category"}


      const data = await WishModel.aggregate([
        MatchStage,
        JoinProductStage, UnwindProductStage,
        JoinBrandStage, UnwindBrandStage,
        JoinCategoryStage, UnwindCategoryStage
      ]);
       
      return {status:"success",data:data}


    } catch (error) {
        return {status:"fail",message:"Something Went Wrong !"}
    }
}