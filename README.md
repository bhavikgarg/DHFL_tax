# DHFL_tax

Installation
------------

- Clone the repository
- Install Node v4.4.2 
- Install dependencies 
```bash
npm install 
```

Running the application
------------
- On the folder project
```
node server/app.js 
```
# Server would start up at http://localhost:9000 
Make a POST request to API at http://localhost:9000/api/taxcerti  with params 

------------
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
