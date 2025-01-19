import { v2 as cloudinary } from 'cloudinary';
import fs, { realpathSync } from  "fs";
//configure cloudinary
cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
    const   response =await cloudinary.uploader.upload(
            localFilePath, {
                resource_type : "auto"
            }
        )
        console.log("file uploaded on cloudinary, File src: " +
            response.url
        )
        //once the file is uploaded , we would like to delet it from our server
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}



export {uploadOnCloudinary}