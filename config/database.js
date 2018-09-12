require('dotenv').config();
let userPwd = "";
if (process.env.DB_USER && process.env.DB_PASS) {
  userPwd = process.env.DB_USER + ':' + process.env.DB_PASS
}
module.exports = {
  uri: 'mongodb://' + userPwd + '@' + process.env.DB_SERVER,
  secret: 'crypto',
  db: 'ostdb'
}
