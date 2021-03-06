/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/todos              ->  index optional query param name
 * POST    /api/todos              ->  create
 * GET     /api/todos/:id          ->  show
 * PUT     /api/todos/:id          ->  upsert
 * PATCH   /api/todos/:id          ->  patch
 * DELETE  /api/todos/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Todo from './todo.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      console.log('todo respondWithResult ' + JSON.stringify(entity));
      return res.status(statusCode).json(entity);
    }
    console.log('todo respondWithResult null');
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    console.log('todo handleEntityNotFound ' + JSON.stringify(entity));
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log('todo handleError inner ' + JSON.stringify(err));
    res.status(statusCode).send(err);
  };
}

// Gets a list of Todos for named user
export function index(req, res) {
  console.log('index'+JSON.stringify(req.params));
  if ( req.query  && req.query.name){
    console.log('name=' + req.query.name);
    return indexListForUser(req, res, req.query.name);
  } else {
    console.log('no name query');
    return indexList(req, res);
  }

  return Todo.find({name:{$eq: 'aaa'}}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Todos for given named user
export function indexListForUser(req, res, name) {
  return Todo.find({name:{$eq: name}}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Gets a list of Todos
export function indexList(req, res) {
  return Todo.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Todo from the DB
export function show(req, res) {
  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Todo in the DB
export function create(req, res) {
  console.log('create todo'+JSON.stringify(req.body));
  debugger;

  return Todo.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Todo in the DB at the specified ID
export function upsert(req, res) {
  console.log('upsert todo');
  console.log(req.body);
  console.log(req.params.id);

  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Todo.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Todo in the DB
export function patch(req, res) {
  console.log('patch todo');
  console.log(req.body);
  console.log(req.params.id);

  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Todo from the DB
export function destroy(req, res) {
  console.log('destroy' + JSON.stringify(req.body));
  console.log(req.params.id);

  return Todo.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
