const express = require('express')
const cors = require('cors')
const app = express()
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
const indexRouter = require('./routes/index.js')
const apiRouter = require('./routes/api.js')

app.use(cors())
app.use(express.urlencoded())

app.use('/', indexRouter)
app.use('/api', apiRouter)

global.movies = [
    {title: "Scott Pilgrim vs. the World",
    description: "In a magically realistic version of Toronto, a young man must defeat his new girlfriend's seven evil exes one by one in order to win her heart.",
    genre: "comedy",
    posterURL: "https://m.media-amazon.com/images/M/MV5BMTkwNTczNTMyOF5BMl5BanBnXkFtZTcwNzUxOTUyMw@@._V1_SX300.jpg",
    movieID: 1
    },
    {title: "Independence Day 20th Anniversary",
    description: "In the epic adventure film 'Independence Day,' strange phenomena surface around the globe. The skies ignite. Terror races through the world's major cities. As these extraordinary events unfold, it becomes increasingly clear that a force of incredible magnitude has arrived; its mission: total annihilation over the Fourth of July weekend. The last hope to stop the destruction is an unlikely group of people united by fate and unimaginable circumstances.",
    genre: "action",
    posterURL: "https://images-na.ssl-images-amazon.com/images/I/A1nusGgxUmL._SY445_.jpg",
    movieID: 2
    },
    {title: "Me and You and Everyone We Know",
    description: "Award-winning and critically acclaimed, Me You and Everyone We Know, is a poetic and penetrating look at how everyday people struggle to connect with one another in an isolating modern world. Christine Jesperson (writer/director Miranda July) is a struggling artist and cab driver who uses her talents and imagination to draw her dreams and objects of desire. One such object is Richard Swersey (John Hawkes, TV's 'Deadwood'), a newly-single father of two boys who is hoping for amazing things, yet panics upon meeting the captivating Christine. But in a world where the mundane is transcendent and people seek meaningful connections despite the risk, anything magical can happen - and well - happen.",
    genre: "drama",
    posterURL: "https://images-na.ssl-images-amazon.com/images/I/5116C62RZ3L._SY445_.jpg",
    movieID: 3
    }
]


app.listen(3000, () => {
    console.log("Lights, Camera, ACTION!")
})