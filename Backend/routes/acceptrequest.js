const express= require('express')
const router=express.Router();
const supabase= require('../database/db');

router.post('/',async(req,res)=>{
try{
const {user1, user2}= req.body;

if(!user1 || !user2)
   return res.status(400).json({status:"InputError",message:"Please forward Valid Input"})

const{error:userError, data:userData}= await supabase
.from('chats')
.insert([{user1,user2}])

if(userError)
    return res.status(500).json({status:"UserError",message:"UserError Detected from supabase"})

const { error: updateError, data: updateData } = await supabase
  .from('friendships')
  .update({ request_status: 'accepted' })
  .match({ sender_id: user2, receiver_id: user1, request_status: 'pending' });

if (updateError) {
  return res.status(500).json({ status: "UpdateError", message: "Error updating friendship status" });
}


return res.status(200).json({status:"Sucess",message:"Request Accepted"})
}
catch (err) {
    console.error("Internal Error:", err);
    return res.status(500).json({
      status: "ServerError",
      message: "Server is Not Responding",
      error: err.message, // Add this line
    });
  }
  

})

module.exports=router