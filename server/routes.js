const controller = require('./controllers');
const { Router } = require('express');

const router = Router();

// Connect controller methods to their corresponding routes
router.get('/:productid', controller.product.get);

router.get('/:productid/styles', controller.styles.get);

router.get('/:productid/related', controller.related.get);

module.exports = router;
