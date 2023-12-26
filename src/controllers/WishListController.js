const { SaveWishListService, RemoveWishListService, WishListService } = require("../services/WishListService")

exports.SaveWishList = async(req, res) =>{
    const result = await SaveWishListService(req);

    res.status(200).json(result)

};


exports.RemoveWishList = async(req, res) =>{
    const result = await RemoveWishListService(req);

    res.status(200).json(result)

};



exports.WishList = async(req, res) =>{
    const result = await WishListService(req);

    res.status(200).json(result)

}