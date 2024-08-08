
import s3 from '@config/awsS3Config';
import {default as config} from "@root/tenshi-config";


export async function uploadFile(file : Express.Multer.File, filename: string) : Promise<any>{
    const params = {
        Bucket: config.FILE.AWS.BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype, 
       // ACL: 'public-read', // opcional, establece los permisos de acceso al objeto
      };

      const result = await s3.upload(params).promise();
      return result.Location;
}
