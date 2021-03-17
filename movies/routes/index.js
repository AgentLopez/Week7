
const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    res.render("index", {movies: movies})
})

router.get('/add', (req, res) => {
    res.render("add")
})

router.get('/details/:id', (req, res) => {
    let id = req.params.id

    let movie = movies.find((movie) => movie.movieID == id)

    res.render("details", movie)
})

router.post('/movies/delete', (req, res) => {
    let id = req.body.id

    movies = movies.filter((movie) => movie.movieID != id)

    res.redirect('/')
})

router.get('/genre/:genre', (req, res) => {
    let genre = req.params.genre

    let moviesGenre = movies.filter((movie) => movie.genre == genre) 

    res.render('genre', {movies: moviesGenre})

})

router.post('/add-movie', (req, res) => {
    let title = req.body.movieTitle
    let description = req.body.desc
    let genre = req.body.movieGenre
    let posterURL = req.body.posterURL

    let newMovie = {
        title: title,
        description: description,
        genre: genre,
        posterURL: posterURL,
        movieID: uuidv4()
    }

    movies.push(newMovie)

    res.redirect('/')
})



module.exports = router