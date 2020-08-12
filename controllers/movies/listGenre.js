const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    let reqBody = req.body
    const GenreModel = require('../../models/genres')
    let data = await GenreModel.find().sort({'updatedAt':-1})
    if (!_.isEmpty(data)) {
      return res.status(200).send({ status: 200, message: 'Data fetched successfully', data: data })
    } else {
      return res.status(200).send({ status: 400, message: 'No details found', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}
