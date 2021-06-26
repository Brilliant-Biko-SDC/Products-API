const models = require('../models');

module.exports = {
  get: function(req, res) {
    const productId = req.params.productid;
    models.related.get(productId, (err, data) => {
      if (err) {
        const errorMsg = {
          status: 404,
          error: 'Not Found',
          message: err,
          path: `/api/products/${productId}/related`,
          timestamp: Date()
        }
        return res.status(404).send(errorMsg);
      }
      res.status(200).send(data);
    });
  }
};
