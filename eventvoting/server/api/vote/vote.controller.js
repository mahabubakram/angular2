/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /api/vote              ->  create
 */

'use strict';

import _ from 'lodash';
import Vote from './vote.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Creates a new Thing in the DB
export function create(req, res) {
  return Vote.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
