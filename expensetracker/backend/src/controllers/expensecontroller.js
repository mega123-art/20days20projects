import { Expense } from "../models/expenseschema.js";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const expense = new Expense({
      userId: req.user._id,
      amount,
      category,
      date,
      description,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = { userId: req.user._id };
    if (startdate) filter.date = { $gte: new Date(startDate) };
    if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };
    const expenses = await Expense.find(filter);
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!expense) {
      return res
        .status(404)
        .json({ error: "Expense not found or not authorized" });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteExpense=async(req,res)=>{
    try {
        const{id}=req.params
        const expense=await Expense.findOneAndDelete({_id:id,userId:req.user._id})

        if(!expense){
            return res.status(404).json({error:'expense not found or unauth'})
        }
        res.json({message:'expense deleted successfully...yeah'})
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}