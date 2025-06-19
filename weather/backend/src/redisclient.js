import redis from "redis";

const redisclient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
redisclient.on("connect", () => console.log("redis client connect hogya"));

redisclient.on("error", (err) => {
  console.error("redis error: ", err);
});
export default redisclient;
