'use strict';

/**
 * Module dependencies.
 */
var runsData = require('../../app/controllers/runs-data'),
  multer = require('multer'),
  users = require('../../app/controllers/users');

module.exports = function(app) {
  app.route('/runs-data')
    .get(runsData.list);
  app.route('/upload')
    .post(
      users.requiresLogin,
      multer({
        onFileUploadStart: function (file) {
          if (file.extension !== 'gpx') {
            return false;
          }
        },
        dest: './uploads/',
        onError: function (error, next) {
          next(error);
        }
      }),
      function (err, req, res, next) {
        if (!err) return next();
        console.error(err.stack);
        res.status(500).render('500', {  error: err.stack});
      },
      runsData.create
    );
};

