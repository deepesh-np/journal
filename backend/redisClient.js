// redisClient.js
const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379" // default Redis port
});

client.on("error", (err) => console.error("Redis Client Error", err));

client.connect(); // connect asynchronously

module.exports = client;
