const bcrypt = require('bcryptjs')

const encryptedPw = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 12)
}
const compareToHashPassword = (plainPassword, encryptedPw) => {
    return bcrypt.compareSync(plainPassword, encryptedPw)
} 

module.exports = {encryptedPw, compareToHashPassword}