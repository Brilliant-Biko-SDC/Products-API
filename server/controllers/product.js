const models = require('../models');

module.exports = {
  get: function(req, res) {
    const id = req.params.productid;
    models.product.get(id, (err, data) => {
      if (err) {
        const errorMsg = {
          status: 404,
          error: 'Not Found',
          message: err,
          path: `/api/products/${id}`,
          timestamp: Date()
        }
        return res.status(404).send(errorMsg);
      }
      res.status(200).send(data);
    });
  }
};
