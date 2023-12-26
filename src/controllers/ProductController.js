const { BrandListService, CategoryListService, SliderListService, ProductListByBrandService, 
    ProductListByCategoryService, ProductListByRemarkService, ListBySimilarService, ListByKeywordService, ProductDetailService, ReviewListService } = require("../services/ProductService");


exports.BrandList = async(req, res) =>{
    const result = await BrandListService();
    res.status(200).json(result)

}


exports.CategoryList = async(req, res) =>{
    const result = await CategoryListService();
    res.status(200).json(result)

}

exports.SliderList = async(req, res) =>{
    const result = await SliderListService();
    res.status(200).json(result)

}

exports.ProductListByBrand = async(req, res) =>{
    const result = await ProductListByBrandService(req);
    res.status(200).json(result)

}


exports.ProductListByCategory = async(req, res) =>{
    const result = await ProductListByCategoryService(req);
    res.status(200).json(result);
}


exports.ProductListByRemark = async(req, res) =>{
    const result = await ProductListByRemarkService(req);
    res.status(200).json(result);
}


exports.ListBySimilar= async (req, res) => {
    const result = await ListBySimilarService(req);
    res.status(200).json(result);

}


exports.ListByKeyword = async (req, res) => {
    const result = await ListByKeywordService (req);
    res.status(200).json(result);
}


exports.ProductDetails = async (req, res) => {
    const result = await ProductDetailService(req);
    res.status(200).json(result);
}


exports.ReviewList = async (req, res) => {
    const result = await ReviewListService(req);
    res.status(200).json(result);
}