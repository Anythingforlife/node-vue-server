let router = require('express').Router();
const fileHandling = require('../_helpers/fileHandling');

router.post('/', (req, res) => {
  const employee = req.body;

  if (!employee.employee_name)
    return res.status(400).json({ message: 'please provide employee_name' })

  const fileData = fileHandling.readAsync('./assets/employees.json');
  let employees = fileData.success ? fileData.data : [];
  const total = employees.length;
  employee.id = total + 1;
  employees.push(employee);
  fileHandling.writeAsync('./assets/employees.json', employees);
  res.json({ message: 'employee added' });
});

router.get('/', (req, res) => {
  try {
    const perPage = req.query.perPage;
    const currentPage = req.query.currentPage;
    const search = req.query.search;

    if (!perPage)
      return res.status(400).json({ message: 'please provide perPage' })

    if (!currentPage)
      return res.status(400).json({ message: 'please provide currentPage' })

    const fileData = fileHandling.readAsync('./assets/employees.json');
    let employees = fileData.success ? fileData.data : [];

    if (search)
      employees = employees.filter((employee) => {
        return employee.employee_name.startsWith(search);
      });

    const total = employees.length;
    const startIndex = perPage * (currentPage - 1);
    const endIndex = perPage * currentPage;
    res.json({ data: employees.slice(startIndex, endIndex), total: total });
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.get('/:id', (req, res) => {
  const employeeId = req.params.id;

  const fileData = fileHandling.readAsync('./assets/employees.json');
  let employees = fileData.success ? fileData.data : [];

  const employee = employees.find((employee => employee.id === employeeId))

  if (!employee)
    return res.status(404).json({ message: 'employee not found' })

  res.json(employee);
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const employee = req.body;

  if (!employee.employee_name)
    return res.status(400).json({ message: 'please provide employee_name' })

  if (!employee.employee_age)
    return res.status(400).json({ message: 'please provide employee_age' })

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