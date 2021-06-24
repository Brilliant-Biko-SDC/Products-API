const db = require('../../database');

module.exports = {
  get: function(cb) {
    // gets list of styles associated with product
    const qs = ``;

    db.query(qs, (err, results) => {
      cb(err, results);
    })
  }
};
