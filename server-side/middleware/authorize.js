import AppError from "../config/appError.js";

export default function (role){
    return function (req, res, next) {
        // console.log(req.user);
        // console.log(req.user.role);
        
        
        if (req.user && req.user.role && role.includes(req.user.role)) {
            next();
        }
        else {
            return next(new AppError("Forbidden: You don't have enough permission to access this resource", 403));
        }
}}; 