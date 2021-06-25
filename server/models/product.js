const db = require('../../database');

module.exports = {
  get: function(id, cb) {
    // gets one product
    // get the associated features
    const qs = ``;

    db.query(qs, (err, results) => {
      cb(err, results);
    })
  }
};
