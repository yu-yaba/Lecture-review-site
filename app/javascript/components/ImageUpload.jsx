import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onImageUpload }) => {
  const { id } = useParams(); // Lecture IDを取得する

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

      fetch(`/api/lectures/${id}`, { // Lecture IDをエンドポイントに含める
        method: 'PUT',
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
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>ここにファイルをドラッグ&ドロップ、またはクリックしてファイルを選択してください。</p>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>} {/* アップロードのステータスを表示 */}
      <button type='button' onClick={handleUpload}>アップロード</button> {/* アップロードボタン */}
    </div>
  );
};

ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;