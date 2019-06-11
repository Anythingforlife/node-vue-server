let router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let employees = [];
    const perPage = req.query.perPage;
    const currentPage = req.query.currentPage;

    try {
        let rawdata = fs.readFileSync('./assets/employees.json');
        employees = JSON.parse(rawdata);
    } catch (err) {
        employees = [];
    }

    const total = employees.length;
    const startIndex = perPage * (currentPage - 1);
    const endIndex = perPage * currentPage;
    res.json({ data: employees.slice(startIndex, endIndex), total: total });
})

module.exports = router;