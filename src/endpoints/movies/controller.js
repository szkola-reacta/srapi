const { v4: uuidv4 } = require('uuid');
const HTTPStatus = require('http-status');

const db = require('../../config/database');

const entitiesSetName = 'movies';

const getEntityById = async (id) => {
  const snapshot = await db.ref(`/${entitiesSetName}/${id}`).once('value');
  return await snapshot.val();
};

exports.create = async (req, res) => {
  try {
    const id = uuidv4();
    const entity = {
      id: id,
      ...req.body
    };

    db.ref(`/${entitiesSetName}/${id}`).set(entity);

    return res.status(HTTPStatus.CREATED).json(entity);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const entity = await getEntityById(id);
    if (entity) {
      return res.status(HTTPStatus.OK).json(entity);
    }
    return res.status(HTTPStatus.NOT_FOUND).json({});
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

exports.getList = async (req, res) => {
  try {
    const snapshot = await db.ref(`/${entitiesSetName}`).once('value');
    const values = snapshot.val();
    const entries = Object.entries(values);
    const results = [];
    entries.forEach(elem => results.push(elem[1]));

    return res.status(HTTPStatus.OK).json(results);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const entity = await getEntityById(id);
    if (entity) {
      const data = await db.ref(`/${entitiesSetName}/${id}`).update({...req.body});
      return res.status(HTTPStatus.OK).json({
        ...entity,
        ...req.body
      });
    }
    return res.status(HTTPStatus.NOT_FOUND).json({});
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const entity = await getEntityById(id);
    if (entity) {
      await db.ref(`/${entitiesSetName}/${id}`).remove();
      return res.status(HTTPStatus.OK).json({});
    }
    return res.status(HTTPStatus.NOT_FOUND).json({});
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
};
