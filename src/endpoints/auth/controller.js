const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const HTTPStatus = require('http-status');

const constants = require('../../config/constants');

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

// TODO: similar logic may be implemented for token refresh
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = authenticate({ email, password });
    if (user) {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign({ id: user.id }, secret);
      // token with expiration time
      // const token = jwt.sign({ id: user.id }, secret, { expiresIn: 60 * 60 });
      return res.status(HTTPStatus.OK).set({
        [constants.TOKEN_HEADER]: token
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

exports.validateToken = async(req, res) => {
  try {
    const secret = process.env.JWT_SECRET;
    try {
      const token = req.body.token;
      const decoded = jwt.verify(token, secret);
      const response = {
        id: decoded.id
      }
      return res.status(HTTPStatus.OK).json(response);
    } catch(err) {
      return res.status(HTTPStatus.FORBIDDEN).json({});
    }
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

exports.protected = async(req, res) => {
  return res.status(HTTPStatus.OK).json({status: 'OK!'});
}
