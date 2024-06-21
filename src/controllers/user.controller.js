import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'



const registerUser = asyncHandler(async(req,res)=>{
// get user details
// validation- non empty
//check if user existed:username,email
//check for images and avatar,
// upload them to cloudinary
//create user object-create entry in db
//remove password and refresh token from response
//check for user creation


const {fullname,email,username,password}=req.body;
// console.log("email:",email);

if(
  [fullname,email,username,password].some((field)=> field?.trim()==="")
){
  throw new ApiError(400,"All fields are required")
}

const existedUser=await User.findOne(
  {
    $or : [{username},{email}]
  }
)

if(existedUser){
  throw new ApiError(409,"User with this username or email exists")
}

// console.log(req.files)
const avatarLocalpath = req.files?.avatar[0]?.path;
// const coverImageLocalPath=req.files?.coverImage[0]?.path;// why is this giving error I am unable to understand
let coverImageLocalPath;//error hai ise le nahi paa raha hai kya hi kare
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
  coverImageLocalPath=req.files.coverImage[0];
}

if(!avatarLocalpath){
  throw new ApiError(400,"Avatar file is required");
}


const avatar = await uploadOnCloudinary(avatarLocalpath);

const coverImage = await uploadOnCloudinary(coverImageLocalPath);


if(!avatar){
  throw new ApiError(400,"avatar is required")
}

const user = await User.create({
  fullname,
  username:username.toLowerCase(),
  email,
  password,
  avatar: avatar.url,
  coverImage:coverImage?.url || ""
})

const createdUser=await User.findById(user._id).select(
  "-password -refreshTokens"
)
if(!createdUser)
{
  throw new ApiError(500,"something went wrong while registration");

}

return res.status(201).json(
  new ApiResponse(200, createdUser, "user registered successfully")
)



})

export {registerUser,}