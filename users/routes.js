let router = require('express').Router();
const fileHandling = require('../_helpers/fileHandling');

router.post('/authenticate', (req, res) => {
  let userData = req.body;

  if (!userData.email || !userData.password)
    return res.status(400).json({ message: 'email or password not provided' });

  const fileData = fileHandling.readAsync('./assets/users.json');
  let users = fileData.success ? fileData.data : [];

  const userRecordIndex = users.findIndex(user => {
    return user.email == userData.email;
  })

  if (userRecordIndex === -1)
    return res.status(401).json({ message: 'This email is not registerd' });

  if (users[userRecordIndex].password !== userData.password)
    return res.status(401).json({ message: 'password is incorrect' });

  res.json({ email: userData.email, token: 'fake jwt token', firstName: users[userRecordIndex].firstName, lastName: users[userRecordIndex].lastName });
})

router.post('/register', (req, res) => {
  let usersData = req.body;

  const fileData = fileHandling.readAsync('./assets/users.json');
  let users = fileData.success ? fileData.data : [];

  const isUserExist = users.some(user => {
    return user.email == usersData.email;
  })

  if (isUserExist)
    return res.status(409).json({ message: 'users already exist with this email' });

  users.push(usersData);
  fileHandling.writeAsync('./assets/employees.json', employees);

  res.json({ message: 'Registration successfully' });

})

module.exports = router;