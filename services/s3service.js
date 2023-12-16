const AWS=require('aws-sdk');


exports.uploadToS3=(data,filename)=>{
      const BUCKET_NAME=process.env.BUCKETNAME;
      const IAM_USER_KEY=process.env.IAMUSER;
      const IAM_SECRET_KEY=process.env.IAMSECRET;
      let s3bucket= new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_SECRET_KEY
      })

        var params={
          Bucket:BUCKET_NAME,
          Key:filename,
          Body:data,
          ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
          s3bucket.upload(params,(err,s3response)=>{
            if(err)
            {console.log(err);
            reject(err);}
            else
            {console.log(s3response);
            resolve(s3response.Location)}
          })
        })
        
}