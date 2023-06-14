import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import LectureNotFound from './LectureNotFound';

const Lecture = ({ lectures, onDelete }) => {
  const { id } = useParams(); // useParamsでURLを取得し、分割代入でidを代入
  const lecture = lectures.find((e) => e.id === Number(id)); // findでidが一致するlectureを取得

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

