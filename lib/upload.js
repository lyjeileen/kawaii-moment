import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';

//associate file with userId
export default async function upload({ file, userId }) {
  const filePath = file.path;
  const fileName = file.originalFilename;
  const content = fs.readFileSync(filePath);

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      //create a unique key based on user id, date, extname
      Key: `post-${userId}-${Math.floor(Math.random() * 10000)}-${Math.floor(
        Date.now() / 1000
      )}${path.extname(fileName)}`,
      Body: content,
    },
  });

  const promise = upload.promise();

  try {
    const data = await promise;
    //return url path
    return data.Location;
  } catch (err) {
    return err;
  }
}
