var express = require('express')
var router = express.Router()
const isAuthorised = require('./../middlewares/isAuthorised').isAuthorised
const isAdmin = require('./../middlewares/isAdmin').isAdmin
/* movies. */
router.post('/movies/add', isAdmin, require('../controllers/movies/addMovies').main)
router.get('/movies/list', require('../controllers/movies/getMoviesList').main)
router.get('/movies/details/:slug', require('../controllers/movies/getMovieDetails').main)
router.delete('/movie/:id', isAdmin, require('../controllers/movies/removeMovie').main)
router.patch('/movie/:id', isAdmin, require('../controllers/movies/updateMovie').main)
router.post('/movies/filter', require('../controllers/movies/filterSearchMovie').main)

/* user */
router.post('/user/signup', require('../controllers/users/signup').main)
router.post('/user/login', require('../controllers/users/login').main)

/* Genre */
router.post('/genre/add', isAdmin, require('../controllers/movies/addGenre').main)
router.get('/genre/list', require('../controllers/movies/listGenre').main)
module.exports = router
