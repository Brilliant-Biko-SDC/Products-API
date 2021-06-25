const db = require('../../database');

module.exports = {
  get: function(productId, cb) {
    // gets list of related products
    // for each list of related items:
      // get features
      // get styles
    const qs = ``;

    db.query(qs, (err, results) => {
      cb(err, results);
    })
  }
};
