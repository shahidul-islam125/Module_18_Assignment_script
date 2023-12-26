const ProfileModel = require("../models/ProfileModel");
const UserModel = require("../models/UserModel");
const EmailSend = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");

exports.UserOTPService = async(req) =>{
    try {
        const email = req.params.email;
        const code = Math.floor(100000+Math.random()*900000);
        const emailText=`Your Verification Code is= ${code}`
        const emailSubject='Email Verification'

        await EmailSend(email, emailText, emailSubject );
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"success", message:"6 Digit OTP has been send"}

    } catch (error) {
        return {status:"fail", message:"Something Went Wrong"}
        
    }
}


exports.VerifyLoginService = async(req) =>{
    try {
        const email= req.params.email;
        const otp= req.params.otp;

        const total = await UserModel.find({email: email, otp: otp}).count();
        
        if(total===1){

            // User ID Read
            const user_id=await UserModel.find({email:email,otp:otp}).select('_id');

            // User Token Create
            const token=EncodeToken(email, user_id[0]['_id'].toString())

            // OTP Code Update To 0
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})


            return {status:"success", message:"Valid OTP", token:token}

        }
        else{
            return {status:"fail", message:"Invalid OTP"}
        }


    

    } catch (error) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}


//Update and Save Both
exports.SaveProfileService = async(req) =>{
    try {
        const user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = user_id;

        await ProfileModel.updateOne({userID: user_id }, {$set: reqBody}, {upsert: true});
        return {status:"success", message:"Profile Save Successfully"}


    } catch (error) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}


exports.ReadProfileService = async(req) =>{
    try {
        const user_id = req.headers.user_id;

        const data = await ProfileModel.findOne({userID: user_id});
        return {status:"success", data: data}


    } catch (error) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}