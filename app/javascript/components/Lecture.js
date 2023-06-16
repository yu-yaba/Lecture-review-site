import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LectureNotFound from './LectureNotFound';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';


const Lecture = ({ lectures, onDelete, }) => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams(); // useParamsでURLを取得し、分割代入でidを代入
  const navigate = useNavigate();
  const lecture = lectures.find((e) => e.id === Number(id)); // findでidが一致するlectureを取得


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(`/api/lectures/${id}/reviews`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        handleAjaxError(error);
      }
    };

    fetchReviews();
  }, [id]);




  const deleteReview = async (reviewId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/events/${id}/reviews/${reviewId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('Review Deleted!');
        navigate('/lectures');
        setReviews(reviews.filter(review => review.id !== reviewId)); // eventsから削除したイベントを除いた配列を作成
        success('Review Deleted!');
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };


  if (!lecture) return <LectureNotFound />;

  return (
    <div className='eventContainer'>
      <h2>
        {lecture.title}
        <Link to={`/lectures/${lecture.id}/edit`}>Edit</Link>
        <button
          className="delete"
          type="button"
          onClick={() => onDelete(lecture.id)}
        >
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>教員:</strong> {lecture.lecturer}
        </li>
        <li>
          <strong>学部:</strong> {lecture.faculty}
        </li>
      </ul>
      

      {reviews.map((review) => (
        <div key={review.id}>
          <li>
            <strong>評価</strong> {review.rating}
            <strong>受講時期</strong> {review.period}
            <strong>教科書</strong> {review.textbook}
            <strong>出席確認</strong> {review.attendance}
            <strong>採点方法</strong> {review.grading_type}
            <strong>難易度</strong> {review.content_difficulty}
            <strong>内容</strong> {review.content_quality}
            <strong>コメント</strong> {review.content}
          </li>
          <button type='button' onClick={() => deleteReview(review.id)}>Delete Review</button>
        </div>
      ))}
      <Link to="newReview">Add a review</Link>

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
  onDelete: PropTypes.func.isRequired,
};

export default Lecture;

