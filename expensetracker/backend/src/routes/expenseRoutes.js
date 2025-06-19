import express from "express"
import { addExpense,deleteExpense,getExpenses, updateExpense } from "../controllers/expensecontroller.js"
import { authMiddleware } from "../middlewares/authmiddlware.js"
const router=express.Router()

router.use(authMiddleware)
router.post('/',addExpense)
router.get('/',getExpenses)
router.patch('/:id',updateExpense)
router.delete('/:id',deleteExpense)

export default router