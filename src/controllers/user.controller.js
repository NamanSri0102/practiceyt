import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req,res)=>{
  //get user details from frontend
  // validation- empty
  //check if user already exist: email se check karna hai
  //check for images and avatar
  // upload them to cloudinary, avatar bhi check karna hai
  // create user object - create entry in db
  // remove password and refresh token
  //check for user creation
  //return res
  const{fullname,email,password,username}=req.body;
  console.log("email:",email);
  
  if([fullname,username,username,password].some((field)=> field?.trim()==="")
)
    {
    throw new ApiError(400,"All fields are required");
  }

  const existedUser = User.findOne({
    $or:[{username},{email}]
  })

  if(existedUser){
    throw new ApiError(409,"User with with username or email already exists")
  }

 const avaterLocalpath =  req.files?.avatar[0]?.path;

 const coverImageLocalPath = req.files?.coverImage?.path;

 if(!avaterLocalpath){
    throw new ApiError(400,"Avatar file is required");
 }


const avatar = await uploadOnCloudinary(avaterLocalpath);

const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400,"Avatar file is required")
}

const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage:coverImage?.url ||"",
    email,
    password,
    username:username.toLowerCase()
})

const created=await User.findById(user._id).select(
    "-password -refreshTokens"
)

if(!created){
    throw new ApiError(500,"something went wrong while creating user")
}

return res.status(201).json(
    new ApiResponse(200,created,"user registered successfully")
)

})

export {registerUser};