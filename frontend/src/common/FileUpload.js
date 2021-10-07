import React, { useRef } from 'react';
import S3 from 'react-aws-s3';

function FileUpload() {
  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];
    const newFileName = fileInput.current.files[0].name.replace(/\..+$/, '');
    const config = {
      bucketName: 'imageuploadlab1',
      dirName: 'restaurant' /* optional */,
      region: 'us-east-2',
      accessKeyId: 'AKIA4R54L2KAYHNNAG7M',
      secretAccessKey: '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',
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
        console.log('success');
      } else {
        console.log('fail');
      }
    });
  };
  return (
    <>
      <label>
        Upload file:
        <input type='file' ref={fileInput} />
      </label>
      <br />
      <button type='button' onClick={handleClick}>
        Upload
      </button>
    </>
  );
}

export default FileUpload;
