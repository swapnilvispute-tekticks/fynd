const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.body
    let params = req.params
    const MoviesModel = require('../../models/movies')
    const GenreModel = require('../../models/genres')
    let genre = await GenreModel.find()
    let data = await MoviesModel.findOne(params).sort({ updatedAt: -1})
    if (!_.isEmpty(data)) {
      return res.status(200).send({ status: 200, message: 'Data fetched successfully', data: { details: data, genre: genre } })
    } else {
      return res.status(200).send({ status: 400, message: 'No details found', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}
