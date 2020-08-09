const _ = require('lodash')

module.exports.main = async () => {
  try {
    let reqBody = {
      email: 'admin@admin.com',
      name: 'Admin',
      role: 'admin'
    }
    const UsersModel = require('./../../models/users')
    const isExist = await UsersModel.findOne({ email: reqBody.email, role: 'admin' })
    if (_.isEmpty(isExist)) {
      const bcrypt = require('bcryptjs')
      const salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync('admin', salt)
      reqBody.role = 'admin'
      reqBody.password = hash
      const data = await UsersModel.create(reqBody)
      console.log('\n\n admin created', data)
      return ({ status: 200, message: 'User registered successfully', data: data })
    } else {
      console.log('\n\n admin already exist')
      return ({ status: 400, message: 'User already exist with the same email', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return ({ status: 400, message: err.message, data: {} })
  }
}
