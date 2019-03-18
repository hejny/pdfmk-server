//todo check config here - convert to getConfig
export const {
    PORT,
    SLIMERJSLAUNCHER,
    CACHE_DIR,
    AWS_S3_BUCKET_NAME: _AWS_S3_BUCKET_NAME,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    ERROR_WRONG_URL,
} = process.env;

export const  AWS_S3_BUCKET_NAME = _AWS_S3_BUCKET_NAME||'untitled';
