import { NextFunction } from "express";


export default function authCheck (req: any, res: any, next:NextFunction){
   console.log('Authenticating from another file...');
  next(); //use this to pass control to the next function e.g the endpoint. if this is ommited, the req,res cycle will never get terminated.
}

