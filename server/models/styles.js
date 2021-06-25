const db = require('../../database');

module.exports = {
  get: function(productId, cb) {
    // gets list of styles associated with product
    // get associated photos
    // get associated skus
    const qs = ``;

    db.query(qs, (err, results) => {
      cb(err, results);
    })
  }
};
