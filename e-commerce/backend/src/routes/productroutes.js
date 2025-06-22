import express from "express"

import { getProducts,getProductById,createProduct,updateProduct,deleteProduct } from "../contollers/productcontoller.js"

import { protect } from "../middleware/authmiddleware.js"

const router=express.Router()

router.get("/",getProducts)
router.post("/",protect,createProduct)
router.get('/:id',getProductById)
router.put('/:id',protect,updateProduct)
router.delete('/:id',protect,deleteProduct)

export default router