// dies ist die Datei die die API starten soll

const express = require('express')
const app = express()
const cors = require('cors')

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

app.use(express.json());
app.use(cors());

app.get('/api/v1/notes', (req, res) => {
  let notizDaten = []

  db.each("SELECT * FROM Notiz", function (err, row) {
    notizDaten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(notizDaten))
  });
})

app.get('/api/v1/users', (req, res) => {
  let userDaten = []

  db.each("SELECT * FROM Autor", function (err, row) {
    userDaten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(userDaten))
  });
})


app.post('/api/v1/notes', (req, res) => {
  console.log(req.body.name);

  db.run(`INSERT INTO Notiz(inhalt) VALUES(?)`, [req.body.name], function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  })


  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

app.post('/api/v1/users', (req, res) => {
  console.log(req.body.lastname);

  db.run(`INSERT INTO Autor(Name, Vorname, Username, Password) VALUES(?, ?, ?, ?)`, [req.body.lastname, req.body.firstname, req.body.userName, req.body.password], function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  })

  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})

app.post('/api/v1/users/login', (req, res) => {
  let correct = []
  // console.log(req.body.userName)
  // console.log(req.body.password)
  console.log("testing")
  db.run('SELECT COUNT(*) FROM Autor WHERE Username=? AND Password=? ', [req.body.userName, req.body.password], function (err,row) {
    console.log("anfragefin")
    console.log(row)
    correct.push(row)
    if(!row){
      console.log("Nothing Found")
    }
    if(row!=null){
      console.log(row.Password)
    }
    
    else {
      console.log("hurray")
    }
  }, function (){
      res.header('content-type', 'application/json');
      res.send(JSON.stringify(correct))
  })
})



app.listen(3001, () => {
  console.log(`Example app listening at http://localhost:3001`)
})