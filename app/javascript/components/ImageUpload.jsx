import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './ImageUpload.module.css';

const ImageUpload = ({ onImageUpload }) => {
  const { id } = useParams(); // Lecture IDを取得する
  console.log("Lecture ID: ", id);

  const [uploadStatus, setUploadStatus] = React.useState(''); // Uploadのステータスを管理する
  const [files, setFiles] = React.useState([]); // 選択されたファイルを保持する

  const onDrop = React.useCallback((acceptedFiles) => {
    // ファイルがドロップされたときにファイルを保存するだけ
    setFiles(acceptedFiles);
  }, []);

  const handleUpload = () => {
    // ボタンがクリックされたときにファイルをアップロード
    files.forEach((file) => {
      const formData = new FormData();
      formData.append('lecture[image]', file);

      fetch(`/api/lectures/${id}/images`, { // Lecture IDをエンドポイントに含める
        method: 'POST', // Here we changed the method from PUT to POST
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setUploadStatus('Upload successful.');
          onImageUpload(data);
        })
        .catch((error) => {
          console.error(error);
          setUploadStatus('Upload failed.');
        });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className='imageUploadCon'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>ここにファイルをドラッグ&ドロップ、またはクリックしてファイルを選択してください。</p>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>} {/* アップロードのステータスを表示 */}
      <div className='imageUploadButton'>
        <button type='button' onClick={handleUpload}>アップロード</button> {/* アップロードボタン */}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
