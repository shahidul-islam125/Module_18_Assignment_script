const { SaveCartListService, RemoveCartListService, CartListService, UpdateCartListService } = require("../services/CartListService");

exports.SaveCartList = async(req, res) =>{
    const result = await SaveCartListService(req)
    res.status(200).json(result);
}



exports.RemoveCartList = async(req, res) =>{
    const result = await RemoveCartListService(req)
    res.status(200).json(result);
}



exports.CartList = async(req, res) =>{
    const result = await CartListService(req)
    res.status(200).json(result);
}



exports.UpdateCartList = async(req, res) =>{
    const result = await UpdateCartListService(req)
    res.status(200).json(result);
}