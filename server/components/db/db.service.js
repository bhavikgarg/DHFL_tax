'use strict'

var config = require('./../../config/environment'),
    sqlInstance = require('mssql'),
    Q = require('q');

/**
    CREATE TABLE [dbo].[Tbl_taxcertificate](
	[Sno] [int] IDENTITY(1,1) NOT NULL,
	[Tdate] [datetime] NULL CONSTRAINT [DF_T_Cap_f_username Tdate]  DEFAULT (getdate()),
	[IP] [varchar](50) NULL,
	[UserName] [varchar](150) NULL,
	[PolicyNo] [varchar](50) NULL,
	[FY] [varchar](50) NULL,
	[Email] [varchar](150) NULL,
	[IsProcessed] [bit] NOT NULL CONSTRAINT [DF_Tbl_taxcertificate_IsProcessed]  DEFAULT ((0))

*/

/**
 * Sample Response : 
 * { err: null,
      result:
        {   recordsets: [],
            recordset: undefined,
            output: {},
            rowsAffected: [ 1 ] 
        } 
    }
*/

exports.addData = function(data) {
    var deferred = Q.defer(),
        query = "INSERT INTO [dbo].[Tbl_taxcertificate] ([IP], [UserName], [PolicyNo], [FY], [Email]) VALUES ('"+data.ip+"','"+data.username+"','"+data.policyNo+"','"+data.fy+"','"+data.emailid+"')";

    try {
        if (sqlInstance) {
            sqlInstance.close();
        }
        sqlInstance.connect(config.mssql)
            .then(function() {
                new sqlInstance.Request()
                    .query(query)
                    .then(function(dbData) {
                            if (sqlInstance) {
                                sqlInstance.close();
                            }
                        deferred.resolve({
                            err: null,
                            result: dbData
                        });

                    })
                    .catch(function(error) {
                        if (sqlInstance) {
                            sqlInstance.close();
                        }
                        deferred.resolve({
                            err: error.message,
                            result: []
                        });
                    });

            }).catch(function(error) {
                if (sqlInstance) {
                    sqlInstance.close();
                }
                deferred.resolve({
                    err: error.message,
                    result: []
                });
            });
        return deferred.promise;
    } catch (err) {
        if (sqlInstance) {
            sqlInstance.close();
        }

    }
}