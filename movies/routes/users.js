
const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    res.render('allMovies', {movies: movies})
})

router.get('/myMovies', (req, res) => {
    let userName = req.session.name
    let user = users.filter((user) => user.name == userName )
    let sortedMovies = []
    for( i=0 ; i < user[0].myMovies.length; i++) {
        let movie = movies.filter((id) => user[0].myMovies[i] == id.movieID)
        sortedMovies.push(movie[0])
    }
    res.render('uMovies', {movies: sortedMovies})
})

router.get('/movies/:id', (req, res) => {
    let userName = req.session.name
    let user = users.filter((user) => user.name == userName )
    let addMovie = req.params.id
    user[0].myMovies.push(addMovie)
    res.redirect('/users')
})

router.get('/add', (req, res) => {
    res.render("add")
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

router.get('/remove/:id', (req, res) => {
    let userName = req.session.name
    let user = users.filter((user) => user.name == userName )
    let removeMovie = req.params.id
    for (i = 0; i < user[0].myMovies.length; i++) {
        if(user[0].myMovies[i] == removeMovie) {
            user[0].myMovies.splice(i, 1)
            
        }
    }

    res.redirect('/users/myMovies')
})

module.exports = router