const _ = require('lodash')

module.exports.main = async (req, res) => {
  try {
    const reqBody = req.body
    let finalResult
    if (reqBody.type === 'search') {
      finalResult = await searchData(reqBody.searchBy)
      return res.status(200).send({ status: 200, message: 'Data fetched successfully', data: finalResult })
    } else if (reqBody.type === 'sort') {
      if (reqBody.filterBy) {
        finalResult = await getFilteredData(reqBody.filterBy)
        return res.status(200).send({ status: 200, message: 'Data fetched successfully', data: finalResult })
      } else {
        return res.status(200).send({ status: 200, message: 'Data fetched successfully', data: finalResult })
      }
    } else if (reqBody.type === 'genre') {
      finalResult = await getGenre(reqBody.genre)
      return res.status(200).send({ status: 200, message: 'Data fetched successfully', data: finalResult })
    } else {
      return res.status(200).send({ status: 400, message: 'Invalid filter requested', data: {} })
    }
  } catch (err) {
    console.log('catch ==>', err)
    return res.status(400).send({ status: 400, message: err.message, data: {} })
  }
}

const getFilteredData = async (filterBy) => {
  const MoviesModel = require('../../models/movies')
  if (filterBy === 'popularity') {
    return await MoviesModel.find().sort({ '99popularity': -1 })
  } else if (filterBy === 'director') {
    return await MoviesModel.find().sort({ director: 1 })
  } else if (filterBy === 'movie') {
    return await MoviesModel.find().sort({ name: 1 })
  } else {
    return []
  }
}

const searchData = async (searchBy) => {
  const MoviesModel = require('../../models/movies')
  if (!searchBy || searchBy === '') {
    return await MoviesModel.find()
  } else {
    return await MoviesModel.find({ $or: [{ name: { $regex: searchBy } }, { director: { $regex: searchBy } }] })
  }
}

const getGenre = async (list) => {
  const MoviesModel = require('../../models/movies')
  console.log('list', list)
  if (list.length === 0) {
    return await MoviesModel.find()
  } else {
    return await MoviesModel.find({ genre: { $in: list } })
  }
}
