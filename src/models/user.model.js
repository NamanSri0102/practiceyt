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
            required:true
        },
        gender:{
            type:String,
            required:true,
            enum:["Male","Female","Others"]
        },
        contact:{
            type:Number,
            required:true,
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


    this.password = bcrypt.hash(this.password,10)
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