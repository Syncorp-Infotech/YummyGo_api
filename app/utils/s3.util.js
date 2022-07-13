const AWS = require('aws-sdk');
const { uniqueId } = require('./app.util')
const config = require('../configs/aws.config')

AWS.config.update({ region: config.S3.REGION });

const s3 = new AWS.S3({
    accessKeyId: config.S3.ACCESS.ID,
    secretAccessKey: config.S3.ACCESS.SECRET
});

exports.uploadFile = (file, folder) => {
    const params = {
        Bucket: `${config.S3.BUCKET_NAME}/${folder}`,
        //host: "http://URL",
        Key: uniqueId(10) + '-' + file.name.replace(' ', '-'),
        Body: file.data,
        ACL: 'public-read'
    };
  
    return new Promise(async(resolve, reject) => {
      await  s3.upload(params, function (err, data) {
            if (err) {
                return reject(err)
            }
            console.log("public",params)
            return resolve(data.Location);
        });
    });
};