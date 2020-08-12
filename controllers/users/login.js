const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.body
    await verifyReq(reqBody)
    const UsersModel = require('./../../models/users')
    let isExist = await UsersModel.findOne({ email: reqBody.email })
    if (!_.isEmpty(isExist)) {
      let bcrypt = require('bcryptjs')
      if (bcrypt.compareSync(reqBody.password, isExist.password)) {
        let token = createJwtToken({ userId: isExist._id, role: isExist.role, userName: isExist.name })
        let finalResult = { userId: isExist._id, email: isExist.email, name: isExist.name, role: isExist.role, token: token }
        return res.status(200).send({ status: 200, message: 'User loggedIn successfully', data: finalResult })
      } else {
        return res.status(200).send({ status: 400, message: 'Invalid credentials entered', data: {} })
      }
    } else {
      return res.status(200).send({ status: 400, message: 'User does not found with above email', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}

const verifyReq = (reqBody) => {
  const Joi = require('joi')
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
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

let createJwtToken = (data) => {
  const jwtSecret = require('../../config/constants').jwtSecret
  const jwt = require('jsonwebtoken')
  var token = jwt.sign(data, jwtSecret)
  return token
}
