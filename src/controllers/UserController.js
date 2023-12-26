const { UserOTPService, VerifyLoginService, SaveProfileService, ReadProfileService } = require("../services/UserServices");

exports.UserOTP = async(req, res) =>{
    const result = await UserOTPService(req);
    res.status(200).json(result)

}

exports.VerifyLogin = async(req, res) =>{
    const result = await VerifyLoginService(req);

    if(result['status']==="success"){

        // Cookies Option
        let cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}

        // Set Cookies With Response
        res.cookie('token',result['token'],cookieOption)
        return res.status(200).json(result)

    }else {
        return res.status(200).json(result)
    }



}


exports.UserLogout = async(req, res) =>{
     // Cookies Option
     let cookieOption={expires:new Date(Date.now()-24*60*60*1000), httpOnly:false}

     // Set Cookies With Response
     res.cookie('token',"",cookieOption)
     return res.status(200).json({status:"success"})

}


//Update and Create Both
exports.CreateProfile = async(req, res)=>{
    const result = await SaveProfileService(req)
    return res.status(200).json(result)
}



exports.ReadProfile = async(req, res)=> {
    const result = await ReadProfileService(req);
    return res.status(200).json(result)
}