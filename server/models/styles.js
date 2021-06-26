const getConnection = require('../../database');
const parseData = require('./helpers/parseDataHelper.js');

module.exports = {
  get: function(productId, cb) {
    const qs = `
      SELECT JSON_OBJECT(
        'product_id', product.id,
        'styles', (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'style_id', styles.id,
            'name', styles.name,
            'sale_price', styles.sale_price,
            'original_price', styles.original_price,
            'default?', IF(styles.default_style = 0, 'false', 'true'),
            'photos', (SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'thumbnail_url', photos.thumbnail_url,
                'url', photos.url
              )
            )
            FROM photos WHERE photos.style_id=styles.id),
            'skus', (SELECT JSON_OBJECTAGG(
              skus.id, JSON_OBJECT(
                'quantity', skus.quantity,
                'size', skus.size
              )
            )
            FROM skus WHERE skus.style_id=styles.id)
          )
        )
        FROM styles WHERE styles.product_id=product.id)
      ) AS result
      FROM product WHERE id=${productId}
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
          error = `Requested styles for product ${productId} were not available`;
          cb(error);
        }

        connection.release();
      })
    });
  }
};
