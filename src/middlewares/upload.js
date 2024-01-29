const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function (file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

module.exports = { upload }
