import React, { useRef } from 'react';
import S3 from 'react-aws-s3';

function FileUpload({ onUpload, id }) {
  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    if (fileInput.current) {
      const file = fileInput.current.files[0];
      // const newFileName = fileInput.current.files[0].name.replace(/\..+$/, '');
      const newFileName = id.replace(/\..+$/, '');
      const config = {
        bucketName: 'imageuploadlab1',
        dirName: 'restaurant' /* optional */,
        region: 'us-east-2',
        accessKeyId: 'AKIA4R54L2KAYHNNAG7M',
        secretAccessKey: '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',
      };
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file, newFileName).then((data) => {
        if (data.status === 204) {
          onUpload(data.location);
        } else {
          console.log('fail');
        }
      });
    }
  };
  return (
    <>
      <input type='file' ref={fileInput} style={{ margin: '8px' }} />
      <br />
      <button type='button' onClick={handleClick} style={{ margin: '8px' }}>
        Upload
      </button>
    </>
  );
}

export default FileUpload;
