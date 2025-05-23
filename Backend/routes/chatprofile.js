const express= require('express')
const router=express.Router();
const supabase= require('../database/db');

router.get('/',async ( req, res) =>{
    const { userId, receiverId } = req.query;

    if (!userId || !receiverId) {
      return res.status(400).json({ error: "Both userId and receiverId are required" });
    }
  
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("chat_id,content, sender_id, receiver_id, sent_at")
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${userId})`)

        .order("sent_at", { ascending: true });
  
      if (error) throw error;
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})


module.exports = router;