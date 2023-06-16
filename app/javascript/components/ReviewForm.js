import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { isEmptyObject, validateReview } from '../helpers/helpers';

const ReviewForm = ({ reviews, onSave }) => {
  const { id } = useParams();

  const initialReviewState = () => {
    const defaults = {
      rating: '',
      period: '',
      textbook: '',
      attendance: '',
      grading_type: '',
      content_difficulty: '',
      content_quality: '',
      content: '',
    };

    return { ...defaults };
  };

  const [review, setReview] = useState(initialReviewState()); // Call the function to get the actual value
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
        <h3>The following errors prohibited the review from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateReview(review); // errorsにエラーメッセージを格納

    if (!isEmptyObject(errors)) { // errorsが空でない場合はエラーメッセージを表示
      setFormErrors(errors);
    } else {
      onSave({ ...review, lecture_id: id });
    }
  };

  useEffect(() => {
    setReview(initialReviewState());
  }, [reviews, id]); // Only re-run the effect if reviews or id changes

  const cancelURL = `/lectures/${id}`;
  const title = review.id ? `${review.review_date} - ${review.review_type}` : '授業レビューを投稿する';

  // URLにidがあるが、reviewが存在しない時にnotfoundページを表示する

  return (
    <section>
      <h2>{title}</h2>
      {renderErrors()}
      <form className="ReviewForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating"> {/* inputのidと紐付け */}
            <strong>評価</strong>
            <input type='text' id="rating" name="rating" onChange={handleInputChange} value={review.rating} />
          </label>
        </div>
        <div>
          <label htmlFor="period">
            <strong>授業を受けた時期</strong>
            <select id="period" name="period" onChange={handleInputChange} value={review.period}>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
            <p>年</p>
            <select id="period" name="period" onChange={handleInputChange} value={review.period}>
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
        <div>
          <label htmlFor="textbook">
            <strong>教科書</strong>
            <select id="textbook" name="textbook" onChange={handleInputChange} value={review.textbook}>
              <option>選択してください</option>
              <option>必要</option>
              <option>不要</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="attendance">
            <strong>出席確認</strong>
            <select id="attendance" name="attendance" onChange={handleInputChange} value={review.attendance}>
              <option>選択してください</option>
              <option>毎回確認</option>
              <option>たまに確認</option>
              <option>なし</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="grading_type">
            <strong>採点方法</strong>
            <select id="grading_type" name="grading_type" onChange={handleInputChange} value={review.grading_type}>
              <option>選択してください</option>
              <option>テストのみ</option>
              <option>レポートのみ</option>
              <option>テスト,レポート</option>
              <option>その他</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="content_difficulty">
            <strong>単位取得難易度</strong>
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
        <div>
          <label htmlFor="content_quality">
            <strong>内容充実度</strong>
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
        <div>
          <label htmlFor="content">
            <strong>コメント</strong>
            <textarea cols="30" rows="5" id="content" name="content" onChange={handleInputChange} value={review.content} />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
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
      period: PropTypes.string.isRequired,
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