const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user_arr = {
    items : [{
   "id": 1,
   "name": "Dima"
},
{
  "id": 2,
   "name": "Vlad"
}]
  }
  res.send(user_arr);
});

module.exports = router;
