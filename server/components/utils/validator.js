'use strict'

let emailValidator = require('email-validator');

exports.validateEmail = function (email) {
    return new Promise((res, rej) => {
        if(emailValidator.validate(email)) {
            return res({ success : true, message : "Email Valid" });
        } else {
            return rej({ success : false, message : "Email ID is not in correct format" });
        }
    })
}

exports.validateFinancialYear = function (fy) {
    return new Promise((res, rej) => {
        if(fy.indexOf("-") > -1) {
            let temp = fy.split("-");
            if(/^\d+$/.test(temp[0]) && /^\d+$/.test(temp[1])) {
                if(temp[0].length == 4 && temp[1].length == 2) {
                    if(temp[0] < new Date().getFullYear()) {
                        if(parseInt(temp[0].substr(-2)) == (parseInt(temp[1]) - 1)) {
                            return res({ success: true, message : "FY Valid"});
                        }
                    }
                }
            }
        }
        return rej({success: false, message : "Financial Year is not valid"});
    })    
}

exports.validatePolicyNumber = function(policyNo) {
    return new Promise((res, rej) => {
        if(/^\d+$/.test(policyNo)) {
            return (policyNo.length == 8) ? res({success: true, message : "Valid"}) : rej({success: false, message : "Policy Number should be of 8 digits"});
        } else {
            return rej({success: false, message: "Policy number can only be numeric"});
        }
    })
}