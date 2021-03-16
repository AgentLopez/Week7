const express = require('express')
const cors = require('cors')
const app = express()
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static("css"))

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

trips = [
    {title: "Los Angeles",
    image: "http://x.x2y1.com/losangeles.jpg",
    departDate: "2020-3-12",
    returnDate: "2020-3-14",
    id: "353245324"
},
{title: "San Fransico",
    image: "http://x.x2y1.com/sanfransico.jpg",
    departDate: "2021-4-14",
    returnDate: "2021-4-24",
    id: "6546546247547"
},
{title: "Portland",
    image: "http://x.x2y1.com/portland.jpg",
    departDate: "2021-5-15",
    returnDate: "2021-5-21",
    id: "7657357378282"
},
]

app.get('/', (req, res) => {
    res.render('index', {tripList: trips})
})

app.get('/add-trip', (req, res) => {
    res.render('add-trip')
})

app.post('/add-trip', (req, res) => {
    let tripTitle = req.body.title
    let imageURL = req.body.image
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let id = uuidv4()

    let newTrip = {title: tripTitle,
    image: imageURL,
    departDate: startDate,
    returnDate: endDate,
    id: id
    }
    trips.push(newTrip)

    res.redirect('/')
})

app.get('/remove/:id', (req, res) => {
    let removeID = req.params.id
    trips = trips.filter((trip) => trip.id != removeID)

    res.redirect('/')
})    
app.listen(3000, () => {
    console.log('Party Time!')
})