import { Injectable } from '@nestjs/common';
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3"

@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.ACCESSKEY_BUCKET,
            secretAccessKey: process.env.SECRETKEY_BUCKET
        }
    })

    async uploadFile(file: Express.Multer.File) {
        const key = file.originalname;
        const url = `https://nest-ocso-project-test.s3.us-east-2.amazonaws.com/${key}`
        const bucket = process.env.BUCKET_NAME;
        const command = new PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket 
        })
        await this.s3.send(command);
        return url;
    }
}
