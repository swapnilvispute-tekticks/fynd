const _ = require('lodash')
const { filter } = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.body
    await verifyReq(reqBody)
    const MoviesModel = require('../../models/movies')
    const GenreModel = require('../../models/genres')
    reqBody.slug = _.kebabCase(reqBody.name)
    let isExist = await MoviesModel.findOne({ slug: reqBody.slug })
    console.log('reqBody',reqBody.genre)
    let genreExist = await GenreModel.find({ name: { $in: reqBody.genre } })
    if (_.isEmpty(isExist)) {
      let existGenres = _.map(genreExist, 'name')
      let notExistGenre = _.difference(reqBody.genre, existGenres)
      if (notExistGenre.length === 0) {
        reqBody.updated_by = req.decoded.userName
        let data = await MoviesModel.create(reqBody)
        return res.status(200).send({ status: 200, message: 'Movie created successfully', data: data })
      } else {
        return res.status(200).send({ status: 400, message: `Genre ${notExistGenre.join(',')} doesn\'t exist`, data: {} })
      }
    } else {
      return res.status(200).send({ status: 400, message: 'Movie already exist with the same name', data: {} })
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
