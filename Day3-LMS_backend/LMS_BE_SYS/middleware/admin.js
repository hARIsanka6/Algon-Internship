const jwt= require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");



function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD); //true or false

    if(decoded){
        req.userId = decoded.Id;
        next();
    }
    else{
        res.json({"error":{"code":"BAD_REQUEST_ERROR","description":"The url field is required.","source":"internal","step":"payment_initiation","reason":"input_validation_failed","metadata":{},"field":"url"}})
    }
}




module.exports = {
    adminMiddleware: adminMiddleware
}