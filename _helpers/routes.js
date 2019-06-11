let express = require('express');
let router = express.Router();

router.use('/users', require('../users/routes'));
router.use('/employees', require('../employee/routes'));

router.use('/', function (req, res) {
    res.status(404).json({ message: 'Resource Path not found' });
});

module.exports = router;