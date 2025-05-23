const express=require('express')
const router=express.Router();
const supabase=require('../database/db')

router.get('/',async(req,res)=>{
    try{
     const user= req.query.user_id;
     console.log(user)

     if(!user){
       return res.status(400).json({status:"Input Error","message":"Irregular Input value recieved"})
     }

        const { error: userError, data: userData } = await supabase
      .from("friendships")
      .select("*")
      .eq("receiver_id", user)
      .eq("request_status", "pending"); // Only fetch pending requests
      
     if(userError){
        return res.status(500).json({status:"userError",message:"UserError From Database"})
     }

     if(!userData || userData.length === 0){
      return res.status(200).json({status:"NoData",message:"No Request"})
     }

     res.status(200).json(userData)
    }
    catch(err){
      console.log(err)
        return res.status(500).json({status:"ServerError",message:"Database Error"})
    }
})

module.exports=router