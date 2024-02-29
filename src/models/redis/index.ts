const redis = require('redis')

const client = redis.createClient({
    url: process.env.REDIS_DATABASE_URL
})

client.connect()

export default client
