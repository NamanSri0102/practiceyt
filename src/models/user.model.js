import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        fullname:{
            type: String,
            required: true,
            index:true,
            trim:true, 
        },
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
            trim:true,
            lowercase:true
        },
        email:{
            type: String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true
        },
        avatar:{
            type:String, // cloudinary ka url
            required:true,
        },
        coverImage:{
            type:String //cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        dob:{
            type:Date,
            required:false
        },
        gender:{
            type:String,
            required:false,
            enum:["Male","Female","Others"]
        },
        contact:{
            type:String,
            required:false,
            minLength:[10,"Must contain 10 digit"],
            maxLength:[10,"Must contain 10 digit"]
        },
        password:{
            type:String,
            required:[true,'password is required']

        },
        refreshTokens:{
            type:String
        }
    }
,{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return


    this.password =await bcrypt.hash(this.password,10)
    next()
});

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullname:this.fullname
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRES
        }
    )
}
userSchema.methods.generateRefreshToken= async function(){
    jwt.sign(
        {
            _id:this._id,
         
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema);