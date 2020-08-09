const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.params
    await verifyReq(reqBody)
    const MoviesModel = require('../../models/movies')
    let movieDetails = await MoviesModel.findOne({ _id: reqBody.id })
    if (!_.isEmpty(movieDetails)) {
      let data = await MoviesModel.deleteOne({ _id: reqBody.id })
      return res.status(200).send({ status: 200, message: 'Movie deleted successfully', data: data })
    } else {
      return res.status(200).send({ status: 200, message: 'No records found for given id', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}

const verifyReq = (reqBody) => {
  const Joi = require('joi')
  const schema = Joi.object({
    'id': Joi.string().required()
  })

  const validated = schema.validate(reqBody, { abortEarly: false })
  if (validated.error && validated.error.details && validated.error.details.length > 0) {
    const errors = validated.error.details.map((error) => {
      return error.message.split('"').join('')
    })
    return Promise.reject({ message: errors })
  } else {
    return validated
  }
}
