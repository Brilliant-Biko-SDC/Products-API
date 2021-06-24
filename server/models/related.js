const db = require('../../database');

module.exports = {
  get: function(cb) {
    // gets list of related products
    const qs = ``;

    db.query(qs, (err, results) => {
      cb(err, results);
    })
  }
};
