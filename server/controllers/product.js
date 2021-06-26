const models = require('../models');

module.exports = {
  get: function(req, res) {
    const id = req.params.productid;
    models.product.get(id, (err, data) => {
      if (err) {
        console.log(err);
        // do something with err
      }
      res.status(200).send(data);
    });
  }
};
