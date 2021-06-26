const getConnection = require('../../database');
const parseData = require('./helpers/parseDataHelper.js');

module.exports = {
  get: function(id, cb) {
    const qs = `
      SELECT JSON_OBJECT(
        'product_id', p.id,
        'name', p.name,
        'slogan', p.slogan,
        'description', p.description,
        'category', p.category,
        'default_price', p.default_price,
        'features', (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'feature', f.feature,
            'value', f.value
          )
        )
        FROM features f WHERE f.product_id=${id})
      ) AS result
      FROM product p WHERE p.id=${id}
    `;

    getConnection((err, connection) => {
      if (err) throw err;

      connection.query(qs, (err, results) => {
        let data;
        let error;

        if (err) {
          throw err;
        } else if (results.length) {
          data = parseData(results);
          cb(null, data);
        } else {
          error = 'Requested product was not available';
          cb(error);
        }

        connection.release();
      })
    });
  }
};
