import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({ 
  cloud_name: 'dmpwhdvgq', 
  api_key: '268113753341859', 
  api_secret: 'woVg4NWUcXmyIJ-5y7uouUtYUqU'
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function imageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  });

  return result;
}

export { upload };
