import multer from 'multer'

// Configure multer to store files in memory
const storage = multer.memoryStorage()

// Create the multer instance with the memory storage configuration
const upload = multer({ storage })

export { upload }
