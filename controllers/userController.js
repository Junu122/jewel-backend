import { userHelper } from "../helpers/userHelper.js";
const userSignup=async(req,res)=>{
 const signupData=req.body;
 console.log(signupData,"signup data")
 
 req.session.userSignupData=signupData;
 const findDuplicateUser=await userHelper.duplicateUserSignup(signupData);
 if(findDuplicateUser.success){
//    userHelper.createUserSignupOtp(signupData).then ((response)=>{
//     if(response.statusMessageSent){
//         req.session.signUpOtpFromTwilioAwaited = true;
//         return res.json({success:true,message:"otp send succesfully",response})
//     }else{
//         return res.json({success:false,message:"cannot send otp"})
//     }
//    })
return res.json({success:true})
 }else{
    res.json({success:false,message:findDuplicateUser.message})
 }
}
const verifyUserSignup=async(req,res)=>{
    try {
        const bodydata=req.body;
        console.log(bodydata)
        const userSignupData=req.session?.userSignupData;
        // userHelper.verifyUserOtp(userData.phone,bodydata.otp).then((response)=>{
        //     console.log(response,"response in user controller verify otp")
        //     if(response.status=='approved'){
        //         userHelper.usersignup(userSignupData).then((response)=>{
        //             console.log(response)
        //             if(response.success){
        //           return res.json({success:true,message:"otp verified",newUser:response?.newUser})
        //             }
        //         })
                
        //     }else{
        //        return response.json({success:false,message:"incorrect otp"})
        //     }
        // })
        if(userSignupData){
           
               userHelper.usersignup(userSignupData).then((response)=>{
                console.log(response)
                  if(response.success){
                 return res.json({success:true,message:"otp verified",newUser:response?.newUser})
                  }
               })
            }
       
    }catch (error) {
        
    }
}



export {userSignup,verifyUserSignup}