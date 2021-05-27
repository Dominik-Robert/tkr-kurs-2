// dies ist die Datei die die API starten soll

const express = require('express')
const app = express()
const cors = require('cors')
const {v4 : uuidv4} = require('uuid')


var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

app.use(express.json());
app.use(cors())

/////////////////////////////////////////////////////////
/////////// Note related /////////////////
/////////////////////////////////////////////////////////

////////// Notes ////////////

// Einzelne Notiz
app.get('/api/v1/note/:id', (req, res) => {
  let daten = []

  db.each(`SELECT * FROM Notiz WHERE NotizID = '${req.params.id}'`, function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

// Updaten

app.put("/api/v1/note/:id/:param/:value", (req, res) => {
  db.run(`UPDATE Notiz SET ${req.params.param}='${req.params.value}' WHERE NotizID='${req.params.id}';`, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

// Get single params out of every note
app.get('/api/v1/notes/:param', (req, res) => {
  let daten = []
  db.each("SELECT * FROM Notiz", function (err, row) {
    daten.push(row[req.params.param])
    
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

// delete specific note with the id
app.delete("/api/v1/notes/:id", (req, res) => {
  console.log(parseInt(req.params.id))
  db.run(`DELETE FROM Notiz WHERE NotizID='${req.params.id}';`, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

// get all notes with all params
app.get('/api/v1/notes/', (req, res) => {
  let daten = []

  db.each("SELECT * FROM Notiz LIMIT 100", function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})


// get all notes in a specific topic
app.get('/api/v1/notes/inTopic/:topic', (req, res) => {
  let daten = []

  db.each(`Select * From Thema INNER JOIN Notiz ON Notiz.ThemenName = Thema.Name Where Thema.Name='${req.params.topic}'`, function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})


// Creates a new note
app.post("/api/v1/notes", (req, res) => {
  console.log(req.body.name)

  let date = new Date();
  let dateSave = (date.getDate()).toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()

  db.run(`INSERT INTO Notiz(NotizId, Inhalt, Erstellung, LetzteAenderung, titel, ThemenName) VALUES(?,?,?,?,?, ?)`, [uuidv4(),"", dateSave, dateSave, req.body.title, req.body.themenName], function (err) {
    if (err) {
      console.log(err)
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

////////// Category ////////////

// create new category
app.post("/api/v1/categories", (req, res) => {

  db.run(`INSERT INTO Kategorie(Name) VALUES(?)`, [req.body.title], function (err) {
    if (err) {
      console.log(err)
    }
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

// get all categories
app.get('/api/v1/categories/', (req, res) => {
  let daten = []

  db.each("SELECT * FROM Kategorie", function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

// Updaten
app.put("/api/v1/category/:Name/:value", (req, res) => {
  db.run(`UPDATE Kategorie SET Name='${req.params.value}' WHERE Name='${req.params.Name}';`, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

////////// Topic ////////////

// create new Topic
app.post("/api/v1/topics", (req, res) => {

  db.run(`INSERT INTO Thema(Name, KategorieName) VALUES(?, ?)`, [req.body.title, req.body.categoryName], function (err) {
    if (err) {
      console.log(err)
    }
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

// get all Topics
app.get('/api/v1/topics/', (req, res) => {
  let daten = []

  db.each("SELECT * FROM Thema", function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

// get all Topics in a category
app.get('/api/v1/topics/:category', (req, res) => {
  let daten = []

  console.log(`Select Thema.Name From Kategorie INNER JOIN Thema ON Thema.KategorieName = Kategorie.Name Where Kategorie.Name='${req.params.category}'`)

  db.each(`Select Thema.Name From Kategorie INNER JOIN Thema ON Thema.KategorieName = Kategorie.Name Where Kategorie.Name='${req.params.category}'`, function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

// Updaten
app.put("/api/v1/category/:Name/:value", (req, res) => {
  db.run(`UPDATE Thema SET Name='${req.params.value}' WHERE Name='${req.params.Name}';`, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})


/////////////////////////////////////////////////////////
/////////// Account related /////////////////
/////////////////////////////////////////////////////////





// Listener
app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})