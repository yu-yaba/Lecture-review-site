import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import Pagination from './Pagination';

const LectureList = ({ lectures }) => {
  // searchTermでフォームの値を管理
  const [searchTerm, setSearchTerm] = useState('');
  // searchInputでフォームの初期値をnull
  const searchInput = useRef(null);
  // 現在のページを管理
  const [currentPage, setCurrentPage] = useState(1);

  // 1ページあたりのレクチャー数
  const lecturesPerPage = 20;

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

  const renderLectures = (lectureArray) => {
    // filter out lectures based on searchTerm
    const filteredLectures = lectureArray.filter((el) => matchSearchTerm(el));

    // calculate total pages

    // get current page lectures
    const startIndex = (currentPage - 1) * lecturesPerPage;
    const endIndex = startIndex + lecturesPerPage;
    const currentPageLectures = filteredLectures.slice(startIndex, endIndex);

    // render current page lectures
    return currentPageLectures
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .map((lecture) => (
        <li key={lecture.id}>
          <NavLink to={`/lectures/${lecture.id}`}>
            {lecture.title}
          </NavLink>
        </li>
      ));
  };  
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
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
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