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
