import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import { isEmptyObject, validateReview } from '../helpers/helpers';
import './ReviewForm.module.css';

const ReviewForm = ({ reviews, onSave }) => {
  const { id } = useParams();

  const initialReviewState = () => {
    const defaults = {
      rating: 0,
      period_year: '',
      period_term: '',
      textbook: '',
      attendance: '',
      grading_type: '',
      content_difficulty: '',
      content_quality: '',
      content: '',
    };

    return { ...defaults };
  };

  const [review, setReview] = useState(initialReviewState()); 
  const [formErrors, setFormErrors] = useState({});

  const updateReview = (key, value) => {
    setReview((prevReview) => ({ ...prevReview, [key]: value }));
  };


  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updateReview(name, value);
  };

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) { // formErrorsが空の場合はnullを返す
      return null;
    }

    return (
      <div className="errors">
        <h3>空欄があります</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };


  useEffect(() => {
    setReview(initialReviewState());
  }, [reviews, id]); 

  const cancelURL = `/lectures/${id}`;
  const title = review.id ? `${review.review_date} - ${review.review_type}` : '授業レビューを投稿する';

  const [value, setvalue] = useState(3);

  const starOnChange = (newValue) => {
    setvalue(newValue);
    setReview({...review, rating: newValue});
  };
      
    const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateReview(review); // errorsにエラーメッセージを格納

    if (!isEmptyObject(errors)) { // errorsが空でない場合はエラーメッセージを表示
      setFormErrors(errors);
    } else {
      onSave({ ...review, lecture_id: id, ratting: value });
    }
  };


  return (
    <section>
      <h2 className='formTitle'>{title}</h2>
      {renderErrors()}
      <form className="lectureForm" onSubmit={handleSubmit}>
        <div className='eachForm'>
          <label htmlFor="rating"> {/* inputのidと紐付け */}
            <p>評価</p>
            <ReactStarsRating
              onChange={starOnChange}
              value={review.rating}
              isEdit
              isHalf
            />
          </label>
        </div>
        <div className='eachForm'>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <p>授業を受けた年</p>
            <select id="period_year" name="period_year" onChange={handleInputChange} value={review.period_year}>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
            <p>ターム</p>
            <select id="period_term" name="period_term" onChange={handleInputChange} value={review.period_term}>
              <option>選択してください</option>
              <option>1ターム</option>
              <option>2ターム</option>
              <option>1, 2ターム</option>
              <option>3ターム</option>
              <option>4ターム</option>
              <option>3, 4ターム</option>
            </select>
          </label>
        </div>
        <div className='eachForm'>
          <label htmlFor="textbook">
            <p>教科書</p>
            <select id="textbook" name="textbook" onChange={handleInputChange} value={review.textbook}>
              <option>選択してください</option>
              <option>必要</option>
              <option>不要</option>
            </select>
          </label>
        </div>
        <div className='eachForm'>
          <label htmlFor="attendance">
            <p>出席確認</p>
            <select id="attendance" name="attendance" onChange={handleInputChange} value={review.attendance}>
              <option>選択してください</option>
              <option>毎回確認</option>
              <option>たまに確認</option>
              <option>なし</option>
            </select>
          </label>
        </div>
        <div className='eachForm'>
          <label htmlFor="grading_type">
            <p>採点方法</p>
            <select id="grading_type" name="grading_type" onChange={handleInputChange} value={review.grading_type}>
              <option>選択してください</option>
              <option>テストのみ</option>
              <option>レポートのみ</option>
              <option>テスト,レポート</option>
              <option>その他</option>
            </select>
          </label>
        </div>
        <div className='eachForm'>
          <label htmlFor="content_difficulty">
            <p>単位取得難易度</p>
            <select id='content_difficulty' name='content_difficulty' onChange={handleInputChange} value={review.content_difficulty}>
              <option>選択してください</option>
              <option>とても楽</option>
              <option>楽</option>
              <option>普通</option>
              <option>難</option>
              <option>とても難しい</option>
            </select>
          </label>
        </div>
        <div className='eachForm'>
          <label htmlFor="content_quality">
            <p>内容充実度</p>
            <select id='content_quality' name='content_quality' onChange={handleInputChange} value={review.content_quality}>
              <option>選択してください</option>
              <option>とても良い</option>
              <option>良い</option>
              <option>普通</option>
              <option>悪い</option>
              <option>とても悪い</option>
            </select>
          </label>
        </div>
        <div className='eachForm'>
          <label htmlFor="content">
            <p>コメント</p>
            <textarea cols="30" rows="5" id="content" name="content" onChange={handleInputChange} value={review.content} />
          </label>
        </div>
        <div className="buttonContainer">
          <button type="submit">投稿する</button>
          <Link to={cancelURL}><button type='button' className='cancelButton'>キャンセル</button></Link>
        </div>
      </form>
    </section>
  );
};

export default ReviewForm;

ReviewForm.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      period_year: PropTypes.string.isRequired,
      period_term: PropTypes.string.isRequired,
      textbook: PropTypes.string.isRequired,
      attendance: PropTypes.string.isRequired,
      grading_type: PropTypes.string.isRequired,
      content_difficulty: PropTypes.string.isRequired,
      content_quality: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

// lectureがまだ渡されていない時(新規作成)でも空の配列をデフォルト値として設定することでエラーを避ける
ReviewForm.defaultProps = {
  reviews: [],
};