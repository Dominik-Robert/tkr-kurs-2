const express = require('express')
const app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

app.get('/api/v1/notes', (req, res) => {
  let daten = [];
  db.each("SELECT * FROM Notiz", function (err, row) {
    if (err) {
      console.log('Error arised', err);
    } else {
      console.log('Zeile x', row)
      daten.push(row);
      console.log(daten);
    }
  })
  console.log(daten)
  res.header('content-type', 'application/json')
  res.send(JSON.stringify(daten));
})


app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})
