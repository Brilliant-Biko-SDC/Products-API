const getConnection = require('../../database');
const parseData = require('./helpers/parseDataHelper.js');

module.exports = {
  get: function(productId, cb) {
    const qs = `
      SELECT JSON_OBJECT(
        'product_id', r.current_product_id,
        'related_product', (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
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
            FROM features f WHERE f.product_id=p.id),
            'photos', (SELECT JSON_OBJECT(
                'thumbnail_url', JSON_UNQUOTE(photos.thumbnail_url),
                'url', JSON_UNQUOTE(photos.url)
              )
              FROM styles
              INNER JOIN photos
              ON photos.style_id=styles.id
              WHERE default_style=1 AND product_id=25173
              LIMIT 1
            )
          )
        )
        FROM product p WHERE id=r.related_product_id)
      ) AS result
      FROM related r WHERE current_product_id=${productId}
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
          error = 'Requested related products were not available';
          cb(error);
        }

        connection.release();
      })
    });
  }
};
