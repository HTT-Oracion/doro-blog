const express = require('express')
const bodyParser = require('body-parser')
/* 跨域 */
const cors = require('cors')
const path = require('path')
/* 配置文件上传 */
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pictures/')
  },
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
const upload = multer({ storage: storage })

const port = 3333
const app = express()
/* body-parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
/* 跨域 */
app.use(cors())
/* 路由 */
require('./routes/web')(app)
require('./routes/admin')(app)
/* 上传 */
app.use(upload.single('file'))
app.post("/upload", upload.single('file'), (req, res) => {
  console.log(req.file);
  const url = 'http://localhost:3333/pictures/' + req.file.filename
  res.send({ url })
  console.log(url);
})
/* 监听 */
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})