import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async(req,_,next)=>{
   try {
      const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
   
      if(!token){
       throw new ApiError(401,"Unauthorized token")
      }
   
      const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
   
      const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
   
      if(!user){
         throw new ApiError(401,"Invalid Access Token");
      }
   
      req.user =user;
      next();
   } catch (error) {
      throw new ApiError(401,error?.message || "invalid user");
   }
})