import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './ImageUpload.module.css';
import { handleAjaxError } from '../helpers/helpers';
import { success } from '../helpers/notifications';

const ImageUpload = ({ onImageUpload }) => {
  const { id } = useParams(); 
  const [uploadStatus] = useState(''); 
  const [files, setFiles] = useState([]); 
  const maxSize = 1048576; // 1MB bytes

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.size > maxSize) {
        handleAjaxError("1MB以下のファイルを選択してください");
      } else if (!file.type.startsWith('image/') && !file.type === 'application/pdf') {
        handleAjaxError("画像ファイルを選択してください");
      } else {
        const newFile = {
          ...file,
          preview: URL.createObjectURL(file),
        };
        setFiles((prevFiles) => [...prevFiles, newFile]);      }
    });
  }, []);


  const handleUpload = () => {
    files.forEach((file) => {
      if (file.size <= maxSize && (file.type.startsWith('image/') || file.type === 'application/pdf')) {  
        const formData = new FormData();
        formData.append('lecture[image]', file);        
        fetch(`/api/lectures/${id}/images`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            success('投稿しました');
            onImageUpload(data);
          })
          .catch((error) => {
            console.error(error);
            handleAjaxError('投稿に失敗しました');
          });
      } else {
        handleAjaxError('1MB以下の画像ファイルを選択してください');
      }
    });
  };
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*, application/pdf' });

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
      {/* 選択された画像のプレビューを表示 */}
      <div className='imagePreviewCon'>
        {files.map(file => {
      if (file.type.startsWith('image/')) {
        return <img src={file.preview} alt={file.name} key={file.name} />;
      } if (file.type === 'application/pdf') {
        return <iframe src={file.preview} title={file.name} key={file.name} />;
      } 
        return null;  
        })}
      </div>
    </div>
  );
};
ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUpload;
