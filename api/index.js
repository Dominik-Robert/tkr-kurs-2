let meinSQLStatement = [
  // Autor
  `CREATE TABLE IF NOT EXISTS Autor
(
  AutorID INT AUTO_INCREMENT,
  Name TEXT,
  Vorname text,
  Username text,
  Password text,
  PRIMARY KEY(AutorID)
);`, // Berechtigungen
  `CREATE TABLE IF NOT EXISTS Berechtigungen
(
  BerechtigungsID int,
  Name text,
  Beschreibung text,
  PRIMARY KEY(BerechtigungsID)
);`, // Tags
  `CREATE TABLE IF NOT EXISTS Tags
(
  TagName text,
  PRIMARY KEY(TagName)
);
`, // Notiz
  `CREATE TABLE IF NOT EXISTS Notiz
(
  NotizID text,
  ThemenName text,
  Inhalt text,
  Erstellung text,
  LetzteAenderung text,
  Titel text,
  PRIMARY KEY(NotizID)
  FOREIGN  KEY(ThemenName) REFERENCES Thema(Name)
);`, // NotizTag -> n:m
`CREATE TABLE IF NOT EXISTS NotizTag
(
  NotizID int,
  TagName text,
  PRIMARY KEY(NotizID, TagName),
  FOREIGN  KEY(NotizID) REFERENCES Notiz(NotizID),
  FOREIGN  KEY(TagName) REFERENCES Tags(TagName)
);`, // AutorNotiz -> n:m
`CREATE TABLE IF NOT EXISTS AutorNotiz
(
  AutorID int,
  NotizID int,
  BerechtigungID int,
  PRIMARY KEY(AutorID, NotizID),
  FOREIGN  KEY(NotizID) REFERENCES Notiz(NotizID),
  FOREIGN  KEY(AutorID) REFERENCES Autor(AutorID),
  FOREIGN  KEY(BerechtigungID) REFERENCES Berechtigungen(BerechtigungsID)
);`, // Thema -> Enthält Notizen
`CREATE TABLE IF NOT EXISTS Thema
(
  Name text,
  KategorieName text,
  PRIMARY KEY(Name)
  FOREIGN  KEY(KategorieName) REFERENCES Kategorie(Name)
);`, // Kategorie -> Enthält Themen
`CREATE TABLE IF NOT EXISTS Kategorie
(
  Name text,
  PRIMARY KEY(Name)
);`];

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.serialize(() => {
  for (query of meinSQLStatement) {
    db.run(query, (result, err) => {
      //console.log(result, err)
    });
  }
  
});

db.close();