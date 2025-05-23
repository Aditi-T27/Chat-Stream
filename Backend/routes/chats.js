const express=require('express')
const supabase=require('../database/db')
const router=express.Router();

router.get('/',async(req,res)=>{
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: "User ID is required" });
  
    const { data, error } = await supabase
      .from("chats")
      .select("user1, user2,id")
      .or(`user1.eq.${userId},user2.eq.${userId}`);
      
  
    if (error) return res.status(500).json({ error: error.message });
  
    const userIds = data.map(chat => (chat.user1 === userId ? chat.user2 : chat.user1));
  
    if (userIds.length === 0) return res.json([]);
  
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, name")
      .in("id", userIds);
  
    if (userError) return res.status(500).json({ error: userError.message });
  
    res.json(userData);
    })

module.exports=router