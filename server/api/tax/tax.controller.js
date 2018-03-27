'use strict'

var config = require('./../../config/environment'),
    validator = require('./../../components/utils/validator'),
    db = require('./../../components/db/db.service');

/**
 * @api {post} /api/taxcerti 
 * @apiName Tax Certi
 *
 * @apiParam {String} userName Username of the user
 * @apiParam {String} ip API request IP
 * @apiParam {String} fy Financial Year 
 * @apiParam {String} emailid Email Address of the user
 * @apiParam {String} policyNo Policy Number
 *
 * @apiSuccess (201) {String} status SUCCESS
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "status": "Error",
 *         "error": "Email id is not in correct format"
 *     }
 */

exports.index = function(req, res) {
    var body = req.body;
    if(!body.policyNo || !body.emailid || !body.fy) {
        return res.status(400).json({ status : "Error", error : "Please provide required inputs" });
    } else {
        validator.validatePolicyNumber(body.policyNo).then(function(response) {
            if(response.success) {
                validator.validateEmail(body.emailid).then(function(response) {
                    if(response.success) {
                        validator.validateFinancialYear(body.fy).then(function(response) {
                            if(response.success) {
                                console.log("All Validations passed : ");
                                db.addData({
                                    ip : (body.ip) ? body.ip : '',
                                    username : (body.userName) ? body.userName : '',
                                    fy : body.fy,
                                    policyNo : body.policyNo,
                                    emailid : body.emailid
                                }).then(function(dbResponse) {
                                    if(dbResponse.err) {
                                        return res.status(400).json({ status : "Error", message : dbResponse.err });        
                                    }
                                    return res.status(201).json({ status : "Success" });        
                                }).catch (function(dbError) {
                                    console.log("Error from DB service, Catch error => ", dbError);
                                    return res.status(400).json({ status : "Error", message : "Unable to process request" });
                                })
                            } else {
                                return res.status(400).json({ status : "Error", message : response.message });                    
                            }
                        }).catch(function(err) {
                            console.log("Error in FY validation", err);
                            return res.status(400).json({ status : "Error", message : err.message });                
                        })
                    } else {
                        return res.status(400).json({ status : "Error", message : response.message });        
                    }
                }).catch(function(err) {
                    console.log("Error in Email ID validation", err);
                    return res.status(400).json({ status : "Error", message : err.message });        
                })  
            } else {
                return res.status(400).json({ status : "Error", message : response.message });
            }
        }).catch(function(err) {
            console.log("Error in Policy number validation", err);
            return res.status(400).json({ status : "Error", message : err.message });
        })
    }
}