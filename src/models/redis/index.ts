const redis = require('redis')

const client = redis.createClient({
    url: process.env.REDIS_DATABASE_URL,
    password: process.env.REDIS_PASSWORD,
    tls: {}
})

client.connect()

export default client
