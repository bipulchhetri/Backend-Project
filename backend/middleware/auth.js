import { decode } from "jsonwebtoken";

export const isLoggedIn=(req,res,next)=>{
const token=req.headers.authorization;
if(!token){
    jwt.verify(token,process.env,JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(401).json({msg:"Invalid token"});
        }
        else {
            req.user=decode;
            next();
        }
    });
}
    else{
        return res.status(401).json({msg:"No token, authorization denied"});
    }
}