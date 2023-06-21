import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import LectureNotFound from './LectureNotFound';
import { handleAjaxError } from '../helpers/helpers';
import './Lecture.module.css';



const Lecture = ({ lectures }) => {
  const [reviews, setReviews] = useState({ reviews: [], avgRating: 0 });
  const { id } = useParams(); // useParamsでURLを取得し、分割代入でidを代入
  const lecture = lectures.find((e) => e.id === Number(id)); // findでidが一致するlectureを取得


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(`/api/lectures/${id}/reviews`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        const avgRating = data.reduce((total, review) => total + review.rating, 0) / data.length;
        setReviews({ reviews: data, avgRating });
      } catch (error) {
        handleAjaxError(error);
      }
    };

    fetchReviews();
  }, [id]);





  if (!lecture) return <LectureNotFound />;

  return (
    <div className='lectureContainer'>
      <div className='lectureHeader'>
        <h2 className='lectureTitle'>
          {lecture.title}
        </h2>
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


      {reviews.reviews && reviews.reviews.map((review) => (
        <div key={review.id} className='lectureReview'>
          <div className='reviewContainer'>
            <li className='eachReview'>
              <ReactStarsRating
                value={review.rating}
                isEdit={false} // ユーザーが評価を編集できないようにする
                isHalf
              />
              <p><strong>受講時期</strong> {review.period_year}{review.period_term} </p>
              <p><strong>教科書</strong> {review.textbook}</p>
              <p><strong>出席確認</strong> {review.attendance}</p>
              <p><strong>採点方法</strong> {review.grading_type}</p>
              <p><strong>難易度</strong> {review.content_difficulty}</p>
              <p><strong>内容</strong> {review.content_quality}</p>
              <p><strong>コメント</strong> {review.content}</p>
            </li>

          </div>
        </div>
      ))}
      <Link to="newReview" className='addReview'><button type='button'>レビューする</button></Link>

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

