import { db } from "../database.js";

const createOrder=async(req,res)=>{
    const itemsOrdered=req.body;
    const amount=Number(itemsOrdered.reduce((acc,item)=>acc+item.product.price*item.qty,0)).toFixed(2);
    console.log(amount);
    
    try{
        const result=await db.query("INSERT INTO orders (orderedItems,amount) VALUES ($1,$2) RETURNING *",
            [JSON.stringify(itemsOrdered), parseFloat(amount)]);
        res.json({
            success:true,
            data:result.rows
        })
    }catch(err){
        console.log(err);
        
    }
   
}

export default createOrder;