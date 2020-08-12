const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    const reqBody = req.body
    await verifyReq(reqBody)
    const decoded = req.decoded
    console.log('decoded', req.decoded)
    const GenreModel = require('../../models/genres')
    reqBody.slug = _.kebabCase(reqBody.name)
    const isExist = await GenreModel.findOne({ name: reqBody.name })
    if (_.isEmpty(isExist)) {
      reqBody.updated_by = req.decoded.userName
      const data = await GenreModel.create(reqBody)
      return res.status(200).send({ status: 200, message: 'Genre created successfully', data: data })
    } else {
      return res.status(200).send({ status: 400, message: 'Genre already exist with the same name', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}

const verifyReq = (reqBody) => {
  const Joi = require('joi')
  const schema = Joi.object({
    name: Joi.string().required()
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
