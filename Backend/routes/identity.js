const supabase= require('../database/db')
const express=require('express')
const router= express.Router();

router.get('/',async(req,res)=>{
    try{
     sender_id=req.query.user_id;
     console.log(sender_id);
    if(!sender_id){
        return res.status(400).json({status:"inputError",message:"Recheck your input data"})
    }
   const {error: userError, data:userData}= await supabase
    .from("users")
    .select("name")
    .in("id",[sender_id])
   
   if(userError){
    console.log("error in fetching name"+userError)
    return res.status(500).json({status:"userError",message:"Could not fetch name"})
   }
 
   return res.status(200).json(userData);
}
catch(err){
    console.log("From Catch Block in identity fetch"+err)
    return res.status(500).json({ error: "Internal Server Error" });
}
})

module.exports=router