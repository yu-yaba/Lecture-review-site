import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { isEmptyObject, validateLecture } from '../helpers/helpers';
import LectureNotFound from './LectureNotFound';

const LectureForm = ({ lectures, onSave }) => {
  const { id } = useParams();

  const initialLectureState = useCallback(
    () => {
      const defaults = {
        title: '',
        lecturer: '',
        faculty: '',
      };

      const currLecture = id ?
        lectures.find((e) => e.id === Number(id)) :
        {};

      return { ...defaults, ...currLecture }
    }, [lectures, id]);
  const [lecture, setLecture] = useState(initialLectureState); // 初期値をセット

  const [formErrors, setFormErrors] = useState({});


  const updateLecture = (key, value) => {
    setLecture((prevLecture) => ({ ...prevLecture, [key]: value }));
  };


  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updateLecture(name, value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateLecture(lecture); // errorsにエラーメッセージを格納

    if (!isEmptyObject(errors)) { // errorsが空でない場合はエラーメッセージを表示
      setFormErrors(errors);
    } else {
      onSave(lecture);
    }
  };

  useEffect(() => {
    setLecture(initialLectureState);
  }, [lectures, initialLectureState]);

  const cancelURL = lecture.id ? `/lectures/${lecture.id}` : '/lectures';
  const title = lecture.id ? `${lecture.title}` : '新しく講義を登録';

  // URLにidがあるが、lectureが存在しない時にnotfoundページを表示する
  if (id && !lecture.id) return <LectureNotFound />;

  return (
    <section>
      <h2>{title}</h2>
      {renderErrors()}
      <form className="lectureForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title"> {/* inputのidと紐付け */}
            <strong>授業名</strong>
            <input type='text' id="title" name="title" onChange={handleInputChange} value={lecture.title} />
          </label>
        </div>
        <div>
          <label htmlFor="lecturer">
            <strong>教授/講師名</strong>
            <input type="text" id="lecturer" name="lecturer" onChange={handleInputChange} value={lecture.lecturer} />
          </label>
        </div>
        <div>
          <label htmlFor="faculty">
            <strong>開講番号:学部</strong>
            <select id="faculty" name="faculty" onChange={handleInputChange} value={lecture.faculty}>
              <option value="">選択してください</option>
              <option value="G: 教養科目">G: 教養科目</option>
              <option value="H: 人文学部">H: 人文学部</option>
              <option value="K: 教育学部">K: 教育学部</option>
              <option value="L: 法学部">L: 法学部</option>
              <option value="E: 経済科学部">E: 経済科学部</option>
              <option value="S: 理学部">S: 理学部</option>
              <option value="M: 医学部">M: 医学部</option>
              <option value="D: 歯学部">D: 歯学部</option>
              <option value="T: 工学部">T: 工学部</option>
              <option value="A: 農学部">A: 農学部</option>
              <option value="X: 創生学部">X: 創生学部</option>
            </select>
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

export default LectureForm;

LectureForm.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      lecturer: PropTypes.string.isRequired,
      faculty: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

// lectureがまだ渡されていない時(新規作成)でも空の配列をデフォルト値として設定することでエラーを避ける
LectureForm.defaultProps = {
  lectures: [],
};