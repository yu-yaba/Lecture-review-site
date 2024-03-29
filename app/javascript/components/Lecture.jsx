import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import Modal from 'react-modal';
import { pdfjs, Document, Page } from 'react-pdf';
import LectureNotFound from './LectureNotFound';
import { handleAjaxError } from '../helpers/helpers';
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import './Lecture.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    marginTop: '7%',
    transform: 'translate(-50%, -50%)'
  }
};

const Lecture = ({ lectures }) => {
  const [reviews, setReviews] = useState({ reviews: [], avgRating: "" });
  const [isOpen, setIsOpen] = useState(false); 
  const [images, setImages] = useState([]);
  const { id } = useParams(); 
  const lecture = lectures.find((e) => e.id === Number(id)); 
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(`/api/lectures/${id}/reviews`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        let avgRating = "";
        if (data.length > 0) {
          avgRating = (data.reduce((total, review) => total + review.rating, 0) / data.length).toFixed(1);
        }
        setReviews({ reviews: data, avgRating });
      } catch (error) {
        handleAjaxError("レビューの取得に失敗しました");
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`/api/lectures/${id}/images`);
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      const imageUrls = data.images ? data.images.map(image => ({ url: image.url, type: image.type })) : [];
      setImages(imageUrls);
      setImageCount(imageUrls.length); 
    };

    fetchImages();
  }, [id]);

  const openModal = () => {
    if (imageCount === 0) {
      handleAjaxError("過去問はありません");
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  if (!lecture) return <LectureNotFound />;

  return (
    <div className='lectureContainer'>
      <div className='lectureHeader'>
        <h2 className='lectureTitle'>
          {lecture.title}
        </h2>
        <div className='rating'>
          <h2 className='lectureAvg'>{reviews.avgRating}</h2>
          <div className='titleStar'>
            <ReactStarsRating value={reviews.avgRating} isEdit={false} isHalf className="star" />
          </div>
        </div>
        <ul className='lectureInfo'>
          <li>
            <strong>教員:</strong> {lecture.lecturer}
          </li>
          <li>
            <strong>学部:</strong> {lecture.faculty}
          </li>
        </ul>
      </div>
      <div className='modalCon'>
        <button type='button' onClick={openModal} style={{ color: imageCount === 0 ? 'red' : '#1DBE67' }}>過去問 ({imageCount})</button>
        <Modal 
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button type='button' className='closeButton' onClick={closeModal}>×</button>
          <div className='imageContainer'>
            {images.map(image => {
              console.log(image);
              if (image.type && image.type.startsWith('image/')) {
                return <a key={image.url} href={image.url} target='_blank' rel="noopener noreferrer">
                  <img src={image.url} alt="過去問" />
                </a>;
              } if (image.type && image.type === 'application/pdf') {
                return <a key={image.url} href={image.url} target='_blank' rel="noopener noreferrer">
                  <div className="pdfContainer">
                    <Document file={image.url} key={image.url}>
                      <Page pageNumber={1} scale={0.3} renderTextLayer={false} />
                    </Document>
                  </div>
                </a>
                  ;
              }
              return null;
            })}
          </div>
        </Modal>
        <Link to="upload" className='addReview'><button type='button'>過去問を投稿</button></Link>
      </div>

      <div className='lectureReview'>
        {reviews.reviews && reviews.reviews.map((review) => (
          <div key={review.id} className='reviewContainer'>
            <li className='eachReview'>
              <ReactStarsRating
                value={parseFloat(review.rating)}
                isEdit={false}
                isHalf
              />
              <p><strong>受講時期</strong> {review.period_year}, {review.period_term} </p>
              <p><strong>教科書</strong> {review.textbook}</p>
              <p><strong>出席確認</strong> {review.attendance}</p>
              <p><strong>採点方法</strong> {review.grading_type}</p>
              <p><strong>難易度</strong> {review.content_difficulty}</p>
              <p><strong>内容</strong> {review.content_quality}</p>
              <p><strong>コメント</strong> {review.content}</p>
            </li>
          </div>
        ))}
      </div>
      <div className='addButtonCon'>
        <Link to="newReview" className='addReview'><button type='button'>レビューする</button></Link>
      </div>
    </div>
  );
};

Lecture.propTypes = {
  lectures: PropTypes.arrayOf( // arrayOfで配列の中身を指定
    PropTypes.shape({ // shapeでオブジェクトの中身を指定
      id: PropTypes.number.isRequired, // isRequiredで必須項目に
      title: PropTypes.string.isRequired,
      lecturer: PropTypes.string.isRequired,
      faculty: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Lecture;

