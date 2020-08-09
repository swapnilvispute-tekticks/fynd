var express = require('express')
var router = express.Router()
const isAuthorised = require('./../middlewares/isAuthorised').isAuthorised
const isAdmin = require('./../middlewares/isAdmin').isAdmin
/* movies. */
router.post('/movies/add', isAdmin, require('../controllers/movies/addMovies').main)
router.get('/movies/list', require('../controllers/movies/getMoviesList').main)
router.delete('/movie/:id', isAdmin, require('../controllers/movies/removeMovie').main)
router.patch('/movie/:id', isAdmin, require('../controllers/movies/updateMovie').main)

/* user */
router.post('/user/signup', require('../controllers/users/signup').main)
router.post('/user/login', require('../controllers/users/login').main)
module.exports = router
