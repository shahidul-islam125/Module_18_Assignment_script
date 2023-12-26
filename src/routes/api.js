const express = require('express');
const router = express.Router()

const AuthVerification = require('../midllewares/authVerification');

const ProductController = require("../controllers/ProductController")
const UserController = require("../controllers/UserController");
const WishListController = require("../controllers/WishListController");
const CartListController = require("../controllers/CartListController");


router.get('/ProductBrandList', ProductController.BrandList )
router.get('/ProductCategoryList', ProductController.CategoryList )
router.get('/ProductSliderList', ProductController.SliderList )
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand )
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory )
router.get('/ProductListBySmilier/:CategoryID', ProductController.ListBySimilar )
router.get('/ProductListByKeyword/:Keyword', ProductController.ListByKeyword )
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark )
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails )
router.get('/ProductReviewList/:ProductID', ProductController.ReviewList )


//User Route
router.get("/UserOTP/:email", UserController.UserOTP)
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin)
router.get("/UserLogout", AuthVerification, UserController.UserLogout)
router.post("/CreateProfile", AuthVerification, UserController.CreateProfile)
router.post("/UpdateProfile", AuthVerification, UserController.CreateProfile  )
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile )


//Wish List Route
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList )
router.post("/RemoveWishList", AuthVerification, WishListController.RemoveWishList )
router.get("/WishList", AuthVerification, WishListController.WishList )

//Cart List Route
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList )
router.post("/RemoveCartList", AuthVerification, CartListController.RemoveCartList )
router.get("/CartList", AuthVerification, CartListController.CartList )



module.exports = router;