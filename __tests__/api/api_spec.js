const frisby = require('frisby');
const Joi = frisby.Joi;

it('GET a product should return a status of 200 OK', function () {
  return frisby.get('http://localhost:3001/api/products/25173')
    .expect('status', 200);
});

it('GET product styles should return a status of 200 OK', function () {
  return frisby.get('http://localhost:3001/api/products/25173/styles')
    .expect('status', 200);
});

it('GET related products should return a status of 200 OK', function () {
  return frisby.get('http://localhost:3001/api/products/25173/related')
    .expect('status', 200);
});

it ('should return a list of product information', function () {
  return frisby
    .get('http://localhost:3001/api/products/25173')
    .expect('status', 200)
    .expect('jsonTypes', {
      'product_id': Joi.number().required(),
      'name': Joi.string().required(),
      'slogan': Joi.string().required(),
      'description': Joi.string().required(),
      'category': Joi.string().required(),
      'default_price': Joi.number().required(),
      'features': Joi.array().required()
    });
});

it ('should return a list of styles', function () {
  return frisby
    .get('http://localhost:3001/api/products/25173/styles')
    .expect('status', 200)
    .expect('jsonTypes', 'styles.*', {
      'style_id': Joi.number().required(),
      'name': Joi.string().required(),
      'sale_price': Joi.string().required(),
      'original_price': Joi.number().required(),
      'default?': Joi.string().required(),
      'skus': Joi.object().required(),
      'photos': Joi.array().required()
    });
});

it ('should return a list of related products and the associated product information', function () {
  return frisby
    .get('http://localhost:3001/api/products/25173/related')
    .expect('status', 200)
    .expect('jsonTypes', '0.related_product.*', {
      'product_id': Joi.number().required(),
      'name': Joi.string().required(),
      'slogan': Joi.string().required(),
      'description': Joi.string().required(),
      'category': Joi.string().required(),
      'default_price': Joi.number().required(),
      'features': Joi.array().required(),
      'photos': Joi.object().required()
    });
});
