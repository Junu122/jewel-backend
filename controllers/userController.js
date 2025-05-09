import { userHelper } from "../helpers/userHelper.js";
const userSignup=async(req,res)=>{
 const signupData=req.body;
 req.session.userSignupData=signupData;
 const findDuplicateUser=await userHelper.duplicateUserSignup(signupData);
 if(findDuplicateUser.success){
    userHelper.usersignup(signupData).then((response)=>{
        if(response.success){
            res.json({success:true,message:"signup success",user:response.userData})
        }else{
            res.json({message:"unable to signup the user"})
        }
    })
 }else{
    res.json({success:false,message:"user email already exist"})
 }
}

const getsessionUser=async(req,res)=>{
    const sessionuser=req.session.userSignupData;
    res.json({useringet:sessionuser})
}

export {userSignup,getsessionUser}