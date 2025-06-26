import mongoose from "mongoose";
const connectdb = async () => {
  try {
    const trytoconnect = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`\n lets'go mongodb is coonected on ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log("mongo db connection error", error);
  }
};
export default connectdb;
