const supabase=require('../database/db')
const express=require('express')
const router=express.Router();

router.post('/',async(req,res)=>{
    const{sender_id,receiver_id}=req.body;
    try{

    if(!sender_id || !receiver_id){
       return res.status(400).json({status:"Error From Input, Check ur Fetch Query"})
    }

    //block to check validity of user existance before sending request and also if they are already freinds before and returns 
    // in those cases.

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, name")
      .in("id", [receiver_id]);

    if(userError){
        console.error("Supabase user lookup error:", userError.message);
        return res.status(500).json({status:"userLookUpError"})
    }
    if (!userData || userData.length === 0) {
        // User not found
        return res.status(404).json({ status: "error", message: "Receiver user does not exist" });
      }
      console.log("User found:", userData[0]);



      const { data: chatData, error: chatError } = await supabase
      .from("chats")
      .select("*")
      .or(`and(user1.eq.${sender_id},user2.eq.${receiver_id}),and(user1.eq.${receiver_id},user2.eq.${sender_id})`);
      
      if(chatError){
        console.error("Supabase user lookup error:", userError.message);
        return res.status(500).json({status:"userLookUpError"})
    }
    if (chatData && chatData.length !== 0) {
        // User not found
        return res.status(404).json({ status: "error", message: "chat exists" });
      }
  
    // continue with insert or other logic here...(to add redundancy in given table)
        
    const {data,error}= await supabase
    .from("friendships")
    .insert([{sender_id,receiver_id}])
  
    if(error){
        console.log(error);
        return res.status(500).json({error:error.message})
    
      }
      return res.status(200).json({status:"Request Sent",message:"Request Sent successfully",data});
    }
    catch(err){
        console.error("Unexpected Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
        
})

module.exports=router
