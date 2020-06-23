const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const HTTPStatus = require('http-status');

const db = require('../../config/database');

// TODO: get real credentials from db, other API etc.
const generateFakeUser = () => {
  const id = uuidv4();
  const user = {
    id,
    email: process.env.FAKE_USER_EMAIL,
    password: process.env.FAKE_USER_PASSWORD
  }
  return user;
}

const authenticate = ({ email, password }) => {
  // it's user from "fake db", implement it by your own :)
  const user = generateFakeUser();
  if (email === user.email && password === user.password) {
    return user;
  }
  return null;
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = authenticate({ email, password });
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return res.status(HTTPStatus.OK).set({
        'X-Access-Token': token
      }).json(user);
    } else {
      return res.status(HTTPStatus.FORBIDDEN).json({});
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

exports.logout = async (req, res) => {
  try {
    
    return res.status(HTTPStatus.NOT_FOUND).json({});
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

