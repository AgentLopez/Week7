const itemBox = document.getElementById("itemBox")
const submitItem = document.getElementById("submitItem")
const listSpot = document.getElementById("listSpot")
const importanceSelector = document.getElementById('importanceSelector')



function deleteTask(num) {
    fetch('http://localhost:3000/todo', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: num})
        })

    .then(response => response.json())
    .then(result => {
        console.log(result.message)
        loadTasks()
    })

}
submitItem.addEventListener('click', function() {
    let title = itemBox.value
    let importance = importanceSelector.value
    let todaysDate = new Date().toLocaleString()
    let tday = todaysDate.slice(0, -13)
    
    fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item: title,
            importance: importance,
            date: tday
        })
    })
        .then(response => response.json())
        .then(result => {
            console.log(result.message)
            if (result.message == "winnner") {
                console.log(result.message)
                alert("Task Added")
            }
            else {

            }
            loadTasks()
        })
    })


function loadTasks() {
    listSpot.innerHTML = ""
fetch("http://localhost:3000/todo")
.then((response) => {
    return response.json()
})
.then((tasks) => {
    
    let counter = 0
    let taskList = tasks.map(function(item) {
        let newItem = `
        <li class="noBullet">${item.item} - ${item.importance} - ${item.date}</li> <button onClick="deleteTask('${counter}')">wipe away</button>
        `
        counter += 1
        return newItem
    })
    listSpot.innerHTML = taskList.join("")
})
}

loadTasks()