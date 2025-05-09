export const userHelper={
    duplicateUserSignup:(userData)=>{
    
        return new Promise(async(resolve,reject)=>{
             try {
             const registrationEmail=userData.email;
            const existemail="amala";
            if(registrationEmail!==existemail){
                resolve({success:true})
            }else{
                resolve("user email already exist")
            }
        } catch (error) {
            console.log("error occured in checking duplicate user signup",error)
            reject(error)
        }
        })
    },
    usersignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                resolve({success:true,userData})
            } catch (error) {
                console.log("error occured while signup",error)
                reject(error)
            }
        })
    }
}