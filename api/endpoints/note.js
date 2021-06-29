var router = require('express').Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')


// Einzelne Notiz
router.get('/:id', (req, res) => {
  let daten = []

  db.each(`SELECT * FROM Notiz WHERE NotizID = '${req.params.id}'`, function (err, row) {
    daten.push(row)
  }, function () {
    res.header('content-type', 'application/json')
    res.send(JSON.stringify(daten))
  });
})

// Updaten

router.put("/:id/:param/:value", (req, res) => {
  db.run(`UPDATE Notiz SET ${req.params.param}='${req.params.value}' WHERE NotizID='${req.params.id}';`, (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.header('content-type', 'application/json');
  res.send(`{"status": "success"}`)
})