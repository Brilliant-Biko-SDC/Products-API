const models = require('../models');

module.exports = {
  get: function(req, res) {
    models.related.get((err, results) => {
      if (err) {
        console.log(err);
        // do something with err
      }

      res.json(results);
    });
  }
};
