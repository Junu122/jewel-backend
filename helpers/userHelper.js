import bcrypt from 'bcrypt'
import sendOtpWithTwilio from '../config/externalConnectionConfig.js';
import twilio from 'twilio'
import userModel from '../models/userModel.js'

 
export const userHelper={
    createUserSignupOtp:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                
                const accountSid = process.env.ACCOUNT_SID;
                const authToken = process.env.AUTH_TOKEN;
             const client = twilio(accountSid, authToken);
             client.verify.v2.services("VA418eb01a965bfe0c8aeb421ad883efd5")
            .verifications
            .create({to:'+91'+userData.phone, channel: 'sms'})
            .then((verification) =>{
                if(verification.status=='pending'){
                    verification.statusMessageSent = true;
                    resolve(verification)
                }
            } );
            } catch (error) {
                console.log(error)
            }
        })
    },
    verifyUserOtp:(userPhoneNumber,userOtp)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                   const accountSid = process.env.ACCOUNT_SID;
                const authToken = process.env.AUTH_TOKEN;
             const client = twilio(accountSid, authToken);
                client.verify.v2.services("VA418eb01a965bfe0c8aeb421ad883efd5")
                .verificationChecks
                .create({to:'+91'+userPhoneNumber,code:userOtp})
                .then((verificationresult)=>{
                    console.log("otp verification result in userhelper :",verificationresult)
                     if (verificationresult.status === 'approved') {

                    resolve(verificationresult);
                } else {
                    reject(new Error('OTP verification failed'));
                }
                })
            } catch (error) {
                console.log(error)
            }
        })
    },
    duplicateUserSignup:(userData)=>{
    
        return new Promise(async(resolve,reject)=>{
             try {
             const registrationEmail=userData.email;
             const registrationPhone=userData.phone;
             if(registrationEmail){
               const existEmail=await userModel.findOne({email:registrationEmail})
               console.log(existEmail)
                 if(!existEmail){
                resolve({success:true})
            }else{
                resolve({message:"user email already exist"})
            }
            }else{
                const existphone=await userModel.findOne({phone:registrationPhone})
                if(!existphone){
                    resolve({success:true})
                }else{
                    resolve({message:'phone number already exist'})
                }
            }
        } catch (error) {
            console.log("error occured in checking duplicate user signup",error)
            reject(error)
        }
        })
    },
    usersignup:(userData)=>{
        console.log("userdata in usersignup last step :",userData)
        return new Promise(async(resolve,reject)=>{
            try {
                userData.password=await bcrypt.hash(userData.password,10)
                userData.joined=new Date();
                userData.blocked=false;
                const newUser= new userModel(userData);
                await newUser.save();
                resolve({success:true,newUser})
            } catch (error) {
                console.log("error occured while signup",error)
                reject(error)
            }
        })
    }
}