var router = require('express').Router();

router.use("/notes", require("./notes"))
router.use("/note", require("./note"))

module.exports = router;
