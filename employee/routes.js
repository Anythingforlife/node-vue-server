let router = require('express').Router();
const fileHandling = require('../_helpers/fileHandling');

router.post('/', (req, res) => {
  const employee = req.body;
  const fileData = fileHandling.readAsync('./assets/employees.json');
  let employees = fileData.success ? fileData.data : [];
  const total = employees.length;
  employee.id = total + 1;
  employees.push(employee);
  fileHandling.writeAsync('./assets/employees.json', employees);
  res.json({ message: 'employee added' });
});

router.get('/', (req, res) => {
  const perPage = req.query.perPage;
  const currentPage = req.query.currentPage;

  const fileData = fileHandling.readAsync('./assets/employees.json');
  let employees = fileData.success ? fileData.data : [];

  const total = employees.length;
  const startIndex = perPage * (currentPage - 1);
  const endIndex = perPage * currentPage;
  res.json({ data: employees.slice(startIndex, endIndex), total: total });
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const employee = req.body;
  const fileData = fileHandling.readAsync('./assets/employees.json');
  let employees = fileData.success ? fileData.data : [];

  const index = employees.findIndex(emp => {
    return parseInt(emp.id) === parseInt(id);
  })

  if (index == -1)
    return res.status(404).json({ message: 'employee record not found' });

  employee.id = id;

  employees[index] = employee;

  fileHandling.writeAsync('./assets/employees.json', employees);
  res.json({ message: 'employee record updated' });
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const fileData = fileHandling.readAsync('./assets/employees.json');
  let employees = fileData.success ? fileData.data : [];

  const index = employees.findIndex(emp => {
    return parseInt(emp.id) === parseInt(id);
  })

  if (index == -1)
    return res.status(404).json({ message: 'employee record not found' });

  employees.splice(index, 1);
  fileHandling.writeAsync('./assets/employees.json', employees);
  res.json({ message: 'employee record deleted' });
})

module.exports = router;