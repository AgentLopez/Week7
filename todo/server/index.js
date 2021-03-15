const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

tasks = [{item: "beans", imporance: "snore", date: "3/16/2021"},{item: "rice", importance: "high", date: "3/16/2021"}]

app.listen(3000, () => {
    console.log("... and we're LIVE!")
})

app.get("/todo", (req, res) => {
    res.json(tasks)
})

app.post("/todo", (req, res) => {
    const task = req.body.item
    const importance = req.body.importance
    const tday = req.body.date

    const newPart = {item: task, importance: importance, date: tday}
    tasks.push(newPart)

    res.json({message: 'winner'})
  
})

app.delete("/todo", (req, res) => {
    const itemNum = req.body.number
    tasks.splice(itemNum, 1)
    res.json({message: 'deleted'})
})