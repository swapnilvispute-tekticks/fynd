const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.body
    let params = req.params
    await verifyReq(reqBody)
    const MoviesModel = require('../../models/movies')
    let isExist = await MoviesModel.find({ _id: params.id })
    if (isExist && isExist.length > 0) {
      let data = await MoviesModel.updateOne({ _id: params.id }, reqBody)
      return res.status(200).send({ status: 200, message: 'Movie updated successfully', data: data })
    } else {
      return res.status(200).send({ status: 400, message: 'Movie doesnt exist', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}

const verifyReq = (reqBody) => {
  const Joi = require('joi')
  const schema = Joi.object({
    '99popularity': Joi.number().required(),
    director: Joi.string().required(),
    genre: Joi.array().required(),
    imdb_score: Joi.number().required()
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
