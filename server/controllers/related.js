const models = require('../models');

module.exports = {
  get: function(req, res) {
    const productId = req.params.productid;
    models.related.get(productId, (err, data) => {
      if (err) {
        console.log(err);
        // do something with err
      }
      res.status(200).send(data);
    });
  }
};
