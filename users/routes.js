let router = require('express').Router();
const fileHandling = require('../_helpers/fileHandling');

router.get('/validate', (req, res) => {
  const token = req.headers.token;

  if (!token)
    return res.status(400).json({ message: 'please provide token' });

  const fileData = fileHandling.readAsync('./assets/users.json');
  let users = fileData.success ? fileData.data : [];

  const user = users.find(user => {
    return user.email == token;
  })

  if (!user)
    return res.status(401).json({ message: 'invalid token' });

  delete user.password;

  res.json(user);
})

router.post('/authenticate', (req, res) => {
  let userData = req.body;

  if (!userData.email || !userData.password)
    return res.status(400).json({ message: 'email or password not provided' });

  const fileData = fileHandling.readAsync('./assets/users.json');
  let users = fileData.success ? fileData.data : [];

  const user = users.find(user => {
    return user.email == userData.email;
  })

  if (!user)
    return res.status(401).json({ message: 'This email is not registered' });

  if (user.password !== userData.password)
    return res.status(401).json({ message: 'password is incorrect' });

  delete user.password;

  res.json({ user, token: user.email });
})

router.post('/register', (req, res) => {
  let usersData = req.body;

  if (!usersData.email)
    return res.status(400).json({ message: 'please provide email' })

  if (!usersData.password)
    return res.status(400).json({ message: 'please provide password' })

  if (!usersData.roleName)
    usersData.roleName = 'user';

  const fileData = fileHandling.readAsync('./assets/users.json');
  let users = fileData.success ? fileData.data : [];

  const isUserExist = users.find(user => {
    return user.email == usersData.email;
  })

  if (isUserExist)
    return res.status(409).json({ message: 'users already exist with this email' });

  users.push(usersData);
  fileHandling.writeAsync('./assets/users.json', users);

  res.json({ message: 'Registration successfully' });

})

module.exports = router;