const express = require('express')
const app = express()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

app.get('/api/v1/notes', (req, res) => {
  let daten = [];

  db.each("SELECT * FROM Notiz", function (err, row) {
    daten.push(row);
    console.log(daten)
  }, function () {
    // Diese Funktion läuft nur, wenn das obere abgeschlossen ist.
    // Hintergrund ist der, dass die obige FUnktion db.each asynchron läuft d.h. sie läuft parallel zu einer anderen Funktion
    // Wir haben vorher immer die Daten zurück gegegeben bevor die Funktion fertig war, was der Fehler war
    console.log('Query completed')
    console.log(daten)
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten));
  })
})


app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})