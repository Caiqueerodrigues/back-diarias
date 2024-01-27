const express = require('express');
const router = express.Router();

const proceduresController = require('./controllers/proceduresController');
const daysController = require('./controllers/daysController');
const paymentsController = require('./controllers/paymentsController');
const pagouController = require('./controllers/pagouController');

router.get('/procedures', proceduresController.getProcedures);
router.get('/days/:date', daysController.getDays);
router.get('/pagamentos', paymentsController.getPayments);

router.post('/days', daysController.createAtendiment);
router.post('/pagou', pagouController.updateAtendiment);

router.delete('/days/:id', daysController.deleteAtendiment);

module.exports = router;