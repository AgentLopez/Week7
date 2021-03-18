
const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');


router.get('/', (req, res) => {
    if(req.session) {
        req.session.username = "maybe"
        req.session.mycat = "we wee"
    }
    res.render("index", {movies: movies})
})

router.get('/user', (req, res) => {
    res.render('user')
})

router.post('/user', (req, res) => {
    let name = req.body.name
    let age = req.body.age
    req.session.name = name
    req.session.age = age

    res.redirect("/confirm")

})

router.get('/confirm', (req, res) => {
    let name = req.session.name
    let age = req.session.age
    let random = req.session.mycat
    
    res.render('confirm', {name: name, age: age, random: random})
})

router.get('/test', (req, res) => {
    let name = req.session.username
    console.log(name)
    res.send(name)
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



router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    let name = req.body.name
    let age = req.body.age
    let password = req.body.password

    let newUser = {
        name: name,
        age: age,
        password: password,
        creator: uuidv4(),
        myMovies: []
    }

    users.push(newUser)
    console.log(users)

    res.redirect('/users')
})

router.post('/login', (req, res) => {
    const name = req.body.name
    const password = req.body.password

    const userCheck = users.find((user) => {
        return user.name == name && user.password == password
    })

    if (userCheck) {
        req.session.name = name
        res.redirect("/users")
    }
    
    else { 
        res.render('login')
    }
    
})


module.exports = router