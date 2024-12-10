import express from "express";
import {getitems,getSingleItem} from "../controllers/itemcontroller.js"

const router=express.Router();

router.get("/items",getitems);
router.get("/items/:id",getSingleItem);

export default router;