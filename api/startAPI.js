// dies ist die Datei die die API starten soll

const express = require('express')
const app = express()
const cors = require('cors')

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

app.use(express.json());
app.use(cors());

app.get('/api/v1/notes', (req, res) => {
  let daten = []

  db.each("SELECT * FROM Notiz", function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

app.post('/api/v1/notes', (req, res) => {
  console.log(req.body.name);

  db.run(`INSERT INTO Notiz(inhalt, titel) VALUES(?, ?)`, ['Inhalt', req.body.name], function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  })


  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})
