ConsoleMe.enabled = true;

S3.config = {
  key: Rise.ENV.get('S3_ACCESS_KEY'),
  secret: Rise.ENV.get('S3_SECRET'),
  bucket: Rise.ENV.get('S3_BUCKET')
};
