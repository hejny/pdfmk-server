/*
import { s3 } from '../storage';
import { AWS_S3_BUCKET_NAME } from '../config';

export async function cacheFileUpload(key: string, file: Buffer, contentType?: string): Promise<Buffer> {
    await s3
        .upload({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
            Body: file,
        })
        .promise();
    return file;
}
*/