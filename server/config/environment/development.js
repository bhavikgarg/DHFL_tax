'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // Server IP
  ip: (process.env.IP || '0.0.0.0'),

  // MS SQL connection options
  mssql: {
    server: '10.50.46.82',
    database: 'insurance_rep_uat_db',
    user: 'xsrivo',
    password: 'Welcome@2016',
    port: 1433
  },
  originURL : 'http://localhost:9000'

}
