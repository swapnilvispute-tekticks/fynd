const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.body
    let params = req.params
    await verifyReq(reqBody)
    const MoviesModel = require('../../models/movies')
    reqBody.slug = _.kebabCase(reqBody.name)
    let isExist = await MoviesModel.find({ $or: [{ slug: reqBody.slug }, { _id: params.id }] })
    if (!_.isEmpty(isExist)) {
      console.log('\n isExist', isExist)
      //let data = await MoviesModel.create(reqBody)
      console.log('\n\n data', data)
      return res.status(200).send({ status: 200, message: 'Movie created successfully', data: isExist })
    } else {
      return res.status(200).send({ status: 200, message: 'Movie already exist with the same name', data: {} })
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
    imdb_score: Joi.number().required(),
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
