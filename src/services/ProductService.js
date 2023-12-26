const mongoose =require('mongoose');
const ObjectId=mongoose.Types.ObjectId;

const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require('../models/ProductModel');
const ReviewModel = require('../models/ReviewModel');


exports.BrandListService = async() => {
    try {
        const data = await BrandModel.find({});
        return {status:"success", data:data};

    } catch (error) {
         return {status:"fail",data:e.toString()}
    }

};


exports.CategoryListService = async() => {
    try {
        const data = await CategoryModel.find({});
        return {status:"success", data:data};

    } catch (error) {
         return {status:"fail",data:e.toString()}
    }

};



exports.SliderListService = async() => {
    try {
        const data = await ProductSliderModel.find({});
        return {status:"success", data:data};

    } catch (error) {
         return {status:"fail",data:e.toString()}
    }

};


exports.ProductListByBrandService = async(req) =>{
    try {
        const BrandID= new ObjectId(req.params.BrandID);
        const MatchStage={$match:{brandID:BrandID}}
        const JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        const JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID", foreignField:"_id",as:"category"}};
        const UnwindBrandStage={$unwind:"$brand"}
        const UnwindCategoryStage={$unwind:"$category"}
        const ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        const data= await  ProductModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])

        return {status:"success", data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



exports.ProductListByCategoryService = async(req) =>{
    try {
       
       const CategoryID = new ObjectId(req.params.CategoryID);
       const MatchStage = {$match: {categoryID: CategoryID}}
       const JoinWithBrandStage ={$lookup: {from: "brands", localField:"brandID", foreignField: "_id", as: "brand" }  };
       const UnwindBrandStage={ $unwind: "$brand"};
       const JoinWithCategoryStage ={$lookup: {from: "categories", localField:"categoryID", foreignField: "_id", as: "category" }  };
       const UnwindCategoryStateL = {$unwind: "$category"};
       const ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


       const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            UnwindBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStateL,
            ProjectionStage
       ])

       return {status:"success", data:data}
        
    } catch (error) {
        return {status:"fail",data:e}.toString()
    }
}


exports.ProductListByRemarkService = async(req) =>{
    try {
        const Remark = req.params.Remark;
        const MatchStage = {$match: {remark: Remark}}
        const JoinWithBrandStage ={$lookup: {from: "brands", localField:"brandID", foreignField: "_id", as: "brand" }  };
        const UnwindBrandStage={ $unwind: "$brand"};
        const JoinWithCategoryStage ={$lookup: {from: "categories", localField:"categoryID", foreignField: "_id", as: "category" }  };
        const UnwindCategoryStateL = {$unwind: "$category"};
        const ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}
 
 
        const data = await ProductModel.aggregate([
             MatchStage,
             JoinWithBrandStage,
             UnwindBrandStage,
             JoinWithCategoryStage,
             UnwindCategoryStateL,
             ProjectionStage
        ])



        return {status:"success", data:data}
        
    } catch (error) {
        return {status:"fail",data:e}.toString()
    }

};



exports.ListBySimilarService = async(req) =>{
    try {
       
       const CategoryID = new ObjectId(req.params.CategoryID);
       const MatchStage = {$match: {categoryID: CategoryID}}
       const LimitStage = {$limit: 2}
       const JoinWithBrandStage ={$lookup: {from: "brands", localField:"brandID", foreignField: "_id", as: "brand" }  };
       const UnwindBrandStage={ $unwind: "$brand"};
       const JoinWithCategoryStage ={$lookup: {from: "categories", localField:"categoryID", foreignField: "_id", as: "category" }  };
       const UnwindCategoryStateL = {$unwind: "$category"};
       const ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


       const data = await ProductModel.aggregate([
            MatchStage,
            LimitStage,
            JoinWithBrandStage,
            UnwindBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStateL,
            ProjectionStage
       ])

       return {status:"success", data:data}
        
    } catch (error) {
        return {status:"fail",data:e}.toString()
    }
};




exports.ListByKeywordService = async(req) =>{
    try {
       
       const SearchRegex = { "$regex": req.params.Keyword, "$options": 'i' } ;
       const SearchQuery = {$or: [ {title: SearchRegex}, {shortDes: SearchRegex} ]};

       const MatchStage = {$match: SearchQuery}
       const JoinWithBrandStage ={$lookup: {from: "brands", localField:"brandID", foreignField: "_id", as: "brand" }  };
       const UnwindBrandStage={ $unwind: "$brand"};
       const JoinWithCategoryStage ={$lookup: {from: "categories", localField:"categoryID", foreignField: "_id", as: "category" }  };
       const UnwindCategoryStateL = {$unwind: "$category"};
       const ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}
       
       

       const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            UnwindBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStateL,
            ProjectionStage
          
            
       ])

       return {status:"success", data:data}
        
    } catch (error) {
        return {status:"fail",data:e}.toString()
    }
}





exports.ProductDetailService = async(req) =>{
    try {
       
       const ProductID = new ObjectId(req.params.ProductID);
       const MatchStage = {$match: {_id: ProductID}}
       const JoinWithDetailsStage ={$lookup: {from: "productdetails", localField:"_id", foreignField: "productID", as: "details" }  };
       const UnwindDetailsState = { $unwind: "$details" };
       const JoinWithBrandStage ={$lookup: {from: "brands", localField:"brandID", foreignField: "_id", as: "brand" }  };
       const UnwindBrandStage={ $unwind: "$brand"};
       const JoinWithCategoryStage ={$lookup: {from: "categories", localField:"categoryID", foreignField: "_id", as: "category" }  };
       const UnwindCategoryStateL = {$unwind: "$category"};
       const ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


       const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithDetailsStage,
            UnwindDetailsState,
            JoinWithBrandStage,
            UnwindBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStateL,
            ProjectionStage
       ])

       return {status:"success", data:data}
        
    } catch (error) {
        return {status:"fail",data:e.toString()}
    }
};


exports.ReviewListService = async(req) =>{
    try {

        const ProductID = new ObjectId(req.params.ProductID);
        const MatchStage = {$match: {productID: ProductID}};
        const JoinWithUserStage ={$lookup: {from: "users", localField:"userID", foreignField: "_id", as: "user" }  };
        const UnwindUserState = { $unwind: "$user" };

        const data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithUserStage,
            UnwindUserState
        ])



        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail",data:e.toString()}
    }
}