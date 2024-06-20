import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_ID , 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET  // Click 'View Credentials' below to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath)=>{
        try{
            if(!localFilePath) return null
            // upload the file on cloudinary

           const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
         // file is uploaded on cloudinary successfully
         console.log("file uploaded successfully",response.url);
         return response;

        }
        
        catch(error){
            fs.unlinkSync(localFilePath);//remove the locally saved temp file aas the upload opertion got failed
            return null;
        }
    }

    export {uploadOnCloudinary};