/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/taxcerti', require('./api/tax'));

  // All other routes should return 404
  app.route('/*')
    .get(function(req, res) {
      res.status(404).json({ error: true, message : "Undefined API Path"});
    });
};
