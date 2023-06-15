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
  const title = review.id ? `${review.review_date} - ${review.review_type}` : 'New review';

  // URLにidがあるが、reviewが存在しない時にnotfoundページを表示する

  return (
    <section>
      <h2>{title}</h2>
      {renderErrors()}
      <form className="ReviewForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating"> {/* inputのidと紐付け */}
            <strong>評価:</strong>
            <input type='text' id="rating" name="rating" onChange={handleInputChange} value={review.rating} />
          </label>
        </div>
        <div>
          <label htmlFor="period">
            <strong>period:</strong>
            <input type="text" id="period" name="period" onChange={handleInputChange} value={review.period} />
          </label>
        </div>
        <div>
          <label htmlFor="textbook">
            <strong>textbook:</strong>
            <input type="text" id="textbook" name="textbook" onChange={handleInputChange} value={review.textbook} />
          </label>
        </div>
        <div>
          <label htmlFor="attendance">
            <strong>attendance:</strong>
            <input type="text" id="attendance" name="attendance" onChange={handleInputChange} value={review.attendance} />
          </label>
        </div>
        <div>
          <label htmlFor="grading_type">
            <strong>grading_type:</strong>
            <input type="text" id="grading_type" name="grading_type" onChange={handleInputChange} value={review.grading_type} />
          </label>
        </div>
        <div>
          <label htmlFor="content_difficulty">
            <strong>content_difficulty:</strong>
            <input type="text" id="content_difficulty" name="content_difficulty" onChange={handleInputChange} value={review.content_difficulty} />
          </label>
        </div>
        <div>
          <label htmlFor="content_quality">
            <strong>content_quality:</strong>
            <input type="text" id="content_quality" name="content_quality" onChange={handleInputChange} value={review.content_quality} />
          </label>
        </div>
        <div>
          <label htmlFor="content">
            <strong>コメント:</strong>
            <textarea cols="20" rows="" id="content" name="content" onChange={handleInputChange} value={review.content} />
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