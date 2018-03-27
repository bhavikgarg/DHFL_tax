/**
 * Express configuration
 */

 'use strict';

 var express = require('express'),
     morgan = require('morgan'),
     fs = require('fs'),
     compression = require('compression'),
     bodyParser = require('body-parser'),
     errorHandler = require('errorhandler'),
     path = require('path'),
     rfs = require('rotating-file-stream'),
     config = require('./environment'),
     cors = require('cors');

 module.exports = function(app) {
   var env = app.get('env');
   app.use(compression());
   app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
   app.use(bodyParser.json({limit: "50mb"}));

   app.use(cors(
    {   credentials: true, 
        origin: ['http://localhost:9000'], 
        allowedHeaders: ["Accept", "Accept-Datetime", "Accept-Encoding", "Accept-Language", "Accept-Params", "Accept-Ranges", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin", "Access-Control-Max-Age", "Access-Control-Request-Headers", "Access-Control-Request-Method", "Age", "Allow", "Alternates", "Authentication-Info", "Authorization", "Cache-Control", "Compliance", "Connection", "Content-Base", "Content-Disposition", "Content-Encoding", "Content-ID", "Content-Language", "Content-Length", "Content-Location", "Content-MD5", "Content-Range", "Content-Script-Type", "Content-Security-Policy", "Content-Style-Type", "Content-Transfer-Encoding", "Content-Type", "Content-Version", "Cookie", "DELETE", "Date", "ETag", "Expect", "Expires", "From", "GET", "GetProfile", "HEAD", "Host", "IM", "If", "If-Match", "If-Modified-Since", "If-None-Match", "If-Range", "If-Unmodified-Since", "Keep-Alive", "OPTION", "OPTIONS", "Optional", "Origin", "Overwrite", "POST", "PUT", "Public", "Referer", "Refresh", "Set-Cookie", "Set-Cookie2", "URI", "User-Agent", "X-Powered-By", "X-Requested-With", "_xser"]
    }));

    var logDirectory = path.join(__dirname, '/../' , 'logs')
    
    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
    
    // create a rotating write stream
    var accessLogStream = rfs('access.log', {
      interval: '1d', // rotate daily
      path: logDirectory
    })
    
    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));

};
