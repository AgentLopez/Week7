const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const session = require('express-session')
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');

const VIEWS_PATH = path.join(__dirname, '/views')

app.use(express.static("css"))
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')
const indexRouter = require('./routes/index.js')
const apiRouter = require('./routes/api.js')
const usersRouter = require('./routes/users')

app.use(cors())
app.use(express.urlencoded())

app.use(session({
    secret: "secretkey",
    saveUninitialized: true
})
)


app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/users', authenticate, usersRouter)

function authenticate(req, res, next) {
    if(req.session) {
        if(req.session.name) {
            next()
        } else {
            res.redirect("/login")
        }
    } else {
        res.redirect('/login')
    }
}


global.movies = [
    {title: "Scott Pilgrim vs. the World",
    description: "In a magically realistic version of Toronto, a young man must defeat his new girlfriend's seven evil exes one by one in order to win her heart.",
    genre: "comedy",
    posterURL: "https://m.media-amazon.com/images/M/MV5BMTkwNTczNTMyOF5BMl5BanBnXkFtZTcwNzUxOTUyMw@@._V1_SX300.jpg",
    movieID: 1,
    creator: ""
    },
    {title: "Independence Day 20th Anniversary",
    description: "In the epic adventure film 'Independence Day,' strange phenomena surface around the globe. The skies ignite. Terror races through the world's major cities. As these extraordinary events unfold, it becomes increasingly clear that a force of incredible magnitude has arrived; its mission: total annihilation over the Fourth of July weekend. The last hope to stop the destruction is an unlikely group of people united by fate and unimaginable circumstances.",
    genre: "action",
    posterURL: "https://images-na.ssl-images-amazon.com/images/I/A1nusGgxUmL._SY445_.jpg",
    movieID: 2,
    creator: ""
    },
    {title: "Me and You and Everyone We Know",
    description: "Award-winning and critically acclaimed, Me You and Everyone We Know, is a poetic and penetrating look at how everyday people struggle to connect with one another in an isolating modern world. Christine Jesperson (writer/director Miranda July) is a struggling artist and cab driver who uses her talents and imagination to draw her dreams and objects of desire. One such object is Richard Swersey (John Hawkes, TV's 'Deadwood'), a newly-single father of two boys who is hoping for amazing things, yet panics upon meeting the captivating Christine. But in a world where the mundane is transcendent and people seek meaningful connections despite the risk, anything magical can happen - and well - happen.",
    genre: "drama",
    posterURL: "https://images-na.ssl-images-amazon.com/images/I/5116C62RZ3L._SY445_.jpg",
    movieID: 3,
    creator: ""
    },
    {title: "National Lampoon's Animal House",
    description: "Starring comedy legend John Belushi, National Lampoon's Animal House is the ultimate college movie filled with food fights, fraternities and toga parties! Follow the uproarious escapades of the Delta House fraternity as they take on Dean Wormer (John Vernon), the sanctimonious Omegas, and the entire female student body. Directed by John Landis (The Blues Brothers), the most popular college comedy of all-time also stars Tim Matheson, Donald Sutherland, Karen Allen, Kevin Bacon, Tom Hulce and Stephen Furst along with Otis Day and the Knights performing their show-stopping rendition of 'Shout.",
    genre: "comedy",
    posterURL: "https://images-na.ssl-images-amazon.com/images/I/81n5s1XVb6L._SX342_.jpg",
    movieID: 4,
    creator: ""
    },
    {title: "The Big Short",
    description: "When four outsiders saw what the big banks, media and government refused to, the global collapse of the economy, they had an idea: The Big Short. Their bold investment leads them into the dark underbelly of modern banking where they must question everyone and everything. Based on the true story and best-selling book by Michael Lewis (The Blind Side, Moneyball), and directed by Adam McKay (Anchorman, Step Brothers), The Big Short stars Christian Bale, Steve Carell, Ryan Gosling and Brad Pitt.",
    genre: "drama",
    posterURL: "https://images-na.ssl-images-amazon.com/images/I/81h0BsqKk4L._SX342_.jpg",
    movieID: 5,
    creator: ""
    },
    {title: "John Wick: Chapters 1-3",
    description: "JOHN WICK: When sadistic young thugs senselessly attack John Wick — a brilliantly lethal ex-assassin — they have no idea that they’ve just awakened the boogeyman. With New York City as his bullet-riddled playground, Wick embarks on a merciless rampage, hunting down his adversaries with the skill and ruthlessness that made him an underworld legend. JOHN WICK: CHAPTER 2: Legendary hit man John Wick is forced out of retirement again by a former associate plotting to seize control of a shadowy international assassins' guild. Bound by a blood oath to help him, John travels to Rome, where he squares off against some of the world's deadliest killers. JOHN WICK: CHAPTER 3 – PARABELLUM: Super assassin John Wick (Keanu Reeves) has a $14 million dollar price tag on his head after killing a member of the High Table, the shadowy international assassins' guild. Now excommunicado, and with any army of the world's most ruthless hit men and women on his trail, John must find a way to survive in this third chapter of the adrenaline-fueled action series.",
    genre: "action",
    posterURL: "https://images-na.ssl-images-amazon.com/images/I/71xN2e9Ho6L._SX342_.jpg",
    movieID: 6,
    creator: ""
    }
]

global.users = [
    {name: "Smith",
    age:"22",
    password: "password",
    creator: "444",
    myMovies: []    
    },
    {name: "Frank",
    age:"54",
    password: "password",
    creator: "555" , 
    myMovies: []   
    },
    {name: "admin",
    age:"54",
    password: "toor",
    creator: "555" , 
    myMovies: []   
    }
]


app.listen(3000, () => {
    console.log("Lights, Camera, ACTION!")
})