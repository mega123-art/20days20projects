import mongoose from "mongoose"
const connectdb= async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`\n lets'go mongodb is coonected on ${process.env.MONGO_URI}`)
    } catch (error) {
        console.log("mongo db connection error", error);
    }
}
export  default connectdb