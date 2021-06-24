const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('ADD SOME ROUTES');
});

module.exports = router;