module.exports = (req, res) => {
  const jwt = require('jsonwebtoken')
  const secretKey = require('../key')
  const token = req.headers.authorization.split(' ')[1]
  let id = ''
  jwt.verify(token, secretKey, (err, authData) => {
    if (err) return null
    id = authData.id
  })
  return id
}