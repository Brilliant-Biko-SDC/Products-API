const models = require('../models');

module.exports = {
  get: function(req, res) {
    models.product.get((err, results) => {
      if (err) {
        console.log(err);
        // do something with err
      }

      res.json(results);
    });
  }
};
