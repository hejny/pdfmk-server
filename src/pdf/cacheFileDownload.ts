import { s3 } from '../storage';
import { AWS_S3_BUCKET_NAME } from '../config';

export async function cacheFileDownload(key: string): Promise<Buffer | null> {
    try {
        const { Body } = await s3
            .getObject({
                Bucket: AWS_S3_BUCKET_NAME,
                Key: key,
            })
            .promise();
        //console.debug('From cache', key);
        return Body as Buffer;
    } catch (error) {
        return null;
    }
}
