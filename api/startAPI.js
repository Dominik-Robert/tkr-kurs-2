// dies ist die Datei die die API starten soll

const express = require('express')
const app = express()
const cors = require('cors')

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

app.use(cors())

app.get('/api/v1/notes', (req, res) => {
  let daten = []

  db.each("SELECT * FROM Notiz", function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})