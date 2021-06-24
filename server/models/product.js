const db = require('../../database');

module.exports = {
  get: function(cb) {
    // gets one product
    const qs = ``;

    db.query(qs, (err, results) => {
      cb(err, results);
    })
  }
};
