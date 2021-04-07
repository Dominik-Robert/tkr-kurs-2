CREATE TABLE IF NOT EXISTS Autor
(
  AutorID INT AUTO_INCREMENT,
  Name TEXT,
  Vorname text,
  Username text,
  Password text,
  PRIMARY KEY(AutorID)
);

CREATE TABLE IF NOT EXISTS Berechtigungen
(
  BerechtigungsID int,
  Name text,
  Beschreibung text,
  PRIMARY KEY(BerechtigungsID)
);

CREATE TABLE IF NOT EXISTS Tags
(
  TagName text,
  PRIMARY KEY(TagName)
);

CREATE TABLE IF NOT EXISTS Notiz
(
  NotizID int,
  Inhalt text,
  Erstellung int,
  LetzteAenderung int,
  Titel int,
  PRIMARY KEY(NotizID)
);

CREATE TABLE IF NOT EXISTS NotizTag
(
  NotizID int,
  TagName text,
  PRIMARY KEY(NotizID, TagName),
  FOREIGN  KEY(NotizID) REFERENCES Notiz(NotizID),
  FOREIGN  KEY(TagName) REFERENCES Tags(TagName)
);

CREATE TABLE IF NOT EXISTS AutorNotiz
(
  AutorID int,
  NotizID int,
  BerechtigungID int,
  PRIMARY KEY(AutorID, NotizID),
  FOREIGN  KEY(NotizID) REFERENCES Notiz(NotizID),
  FOREIGN  KEY(AutorID) REFERENCES Autor(AutorID),
  FOREIGN  KEY(BerechtigungID) REFERENCES Berechtigungen(BerechtigungsID)
);