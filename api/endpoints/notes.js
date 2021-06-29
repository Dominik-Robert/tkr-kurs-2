var router = require('express').Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')


// Get single params out of every note
router.get('/:param', (req, res) => {
  let daten = []
  db.each("SELECT * FROM Notiz", function (err, row) {
    daten.push(row[req.params.param])
    
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

// delete specific note with the id
router.delete("/:id", (req, res) => {
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
router.get('/', (req, res) => {
  let daten = []

  db.each("SELECT * FROM Notiz LIMIT 100", function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

module.exports = router