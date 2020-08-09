var express = require('express')
var router = express.Router()

/* GET home page. */
router.post('/movies/add', require('../controllers/movies/addMovies').main)
router.get('/movies/list', require('../controllers/movies/getMoviesList').main)
router.delete('/movie/:id', require('../controllers/movies/removeMovie').main)
router.patch('/movie/:id', require('../controllers/movies/updateMovie').main)

module.exports = router
