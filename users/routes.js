let router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
  let data = [{
    id: 1,
    username: 'om',
    firstName: 'om',
    token: 'fake-jwt-token'
  }];
  res.json(data);
})

router.post('/authenticate', (req, res) => {
  let userData = req.body;
  let users = [];

  if (!userData.email || !userData.password)
    return res.status(400).json({ message: 'email or password not provided' });

  try {
    let rawdata = fs.readFileSync('./assets/users.json');
    users = JSON.parse(rawdata);
  } catch (err) {
    users = [];
  }

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
  let users = [];

  try {
    let rawdata = fs.readFileSync('./assets/users.json');
    users = JSON.parse(rawdata);
  } catch (err) {
    users = [];
  }

  const isUserExist = users.some(user => {
    return user.email == usersData.email;
  })

  if (isUserExist)
    return res.status(409).json({ message: 'users already exist with this email' });

  users.push(usersData);
  fs.writeFileSync('./assets/users.json', JSON.stringify(users));

  res.json({ message: 'Registration successfully' });

})

module.exports = router;