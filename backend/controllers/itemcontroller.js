import { db } from "../database.js"

const getitems = async (req, res) => {
    try {
        const keyword=req.query.keyword;
        let query="SELECT * FROM food";
        const values=[]
        if(keyword){
            query+=" WHERE name ILIKE $1";
            values.push(`%${keyword}%`)
        }
        const items = await db.query(query,values)
        res.json({
            success: true,
            data: items.rows
        })
    } catch (err) {
        console.log(err);

    }
}

const getSingleItem = async (req, res) => {
    try {
        const id = (req.params.id);
        const singleItem = await db.query("SELECT * FROM food WHERE id=$1", [id])
        res.json({
            success: true,
            data: singleItem.rows
        })
    } catch (err) {
        console.log(err);

    }
}

export { getitems, getSingleItem };

