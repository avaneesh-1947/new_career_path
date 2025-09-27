const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('🔗 Redis Client Connected');
    });

    redisClient.on('ready', () => {
      console.log('✅ Redis Client Ready');
    });

    redisClient.on('end', () => {
      console.log('🔌 Redis Client Disconnected');
    });

    await redisClient.connect();
    
    return redisClient;
  } catch (error) {
    console.error('❌ Redis connection failed:', error.message);
    // Don't exit process for Redis connection failure
    // The app can still work without Redis (with reduced performance)
  }
};

// Cache helper functions
const cache = {
  async get(key) {
    try {
      if (!redisClient || !redisClient.isOpen) return null;
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  },

  async set(key, value, expireInSeconds = 3600) {
    try {
      if (!redisClient || !redisClient.isOpen) return false;
      await redisClient.setEx(key, expireInSeconds, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Redis SET error:', error);
      return false;
    }
  },

  async del(key) {
    try {
      if (!redisClient || !redisClient.isOpen) return false;
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Redis DEL error:', error);
      return false;
    }
  },

  async exists(key) {
    try {
      if (!redisClient || !redisClient.isOpen) return false;
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return false;
    }
  }
};

module.exports = { connectRedis, cache };
