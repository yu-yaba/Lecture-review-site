import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const LectureList = ({ lectures }) => {
  // searchTermでフォームの値を管理
  const [searchTerm, setSearchTerm] = useState('');
  // searchInputでフォームの初期値をnull
  const searchInput = useRef(null);

  const updateSearchTerm = () => {
    // useRef.currentで参照した値に更新
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    // eslint-disable-next-line camelcase
    const { id, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  const renderLectures = (lectureArray) => lectureArray
      .filter((el) => matchSearchTerm(el))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .map((lecture) => (
        <li key={lecture.id}>
          <NavLink to={`/lectures/${lecture.id}`}>
            {lecture.title}
          </NavLink>
        </li>
      ));
  
  return (
    <section className="lectureList">
      <h2>
        授業一覧
        <Link to="/lectures/new">講義を登録</Link>
      </h2>

      <input
        className="search"
        placeholder="検索"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm} // キーを話した時に実行
      />

      <ul>{renderLectures(lectures)}</ul>
    </section>
  );
};

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    lecturer: PropTypes.string,
    faculty: PropTypes.string,
  })).isRequired,
};

export default LectureList;