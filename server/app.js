const express = require('express')
const bodyParser = require('body-parser')
/* 跨域 */
const cors = require('cors')
const path = require('path')
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
/* 监听 */
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})