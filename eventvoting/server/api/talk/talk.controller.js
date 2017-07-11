/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/talk              ->  getAllTalks
 */

'use strict';

import _ from 'lodash';
import Talk from './talk.model';


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


// Gets a list of Things
export function getAllTalks(req, res) {
  console.log(req.params);
  return Talk.find({ uuid: req.params.uuid}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
