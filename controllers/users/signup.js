const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.body
    await verifyReq(reqBody)
    const UsersModel = require('./../../models/users')
    let isExist = await UsersModel.findOne({ email: reqBody.email })
    console.log('\n\n isExist', isExist)
    if (_.isEmpty(isExist)) {
      let bcrypt = require('bcryptjs')
      let salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(reqBody.password, salt)
      reqBody.password = hash
      let data = await UsersModel.create(reqBody)
      return res.status(200).send({ status: 200, message: 'User registered successfully', data: data })
    } else {
      return res.status(200).send({ status: 400, message: 'User already exist with the same email', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}

const verifyReq = (reqBody) => {
  const Joi = require('joi')
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'user')
  })

  const validated = schema.validate(reqBody, { abortEarly: false })
  if (validated.error && validated.error.details && validated.error.details.length > 0) {
    const errors = validated.error.details.map((error) => {
      return error.message.split('"').join('')
    })
    console.log('\n\n erros', errors)
    return Promise.reject({ message: errors })
  } else {
    return validated
  }
}
