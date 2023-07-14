/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import Pagination from './Pagination';
import './LectureList.module.css';

const LectureList = ({ lectures }) => {
  const [searchWord, setSearchWord] = useState('');
  const searchInput = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  // 1ページあたりのレクチャー数
  const lecturesPerPage = 10;

  const updateSearchWord = () => {
    // useRef.currentで参照した値に更新
    setSearchWord(searchInput.current.value);
  };

  const matchSearchWord = (obj) => {
    // eslint-disable-next-line camelcase
    const { id, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some((value) =>
      value
        .toString()
        .toLowerCase()
        .indexOf(searchWord.toLowerCase()) > -1
    );
  };

  const renderLectures = (lectureArray) => {
    const filteredLectures = lectureArray.filter((el) => matchSearchWord(el));
    const startIndex = (currentPage - 1) * lecturesPerPage;
    const endIndex = startIndex + lecturesPerPage;
    const currentPageLectures = filteredLectures.slice(startIndex, endIndex);

    return currentPageLectures
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .map((lecture) => (
        <NavLink to={`/lectures/${lecture.id}`} className='lecture'>
          <li key={lecture.id} >
            <h2>{lecture.title}</h2>
            <div className='lectureInfo'>
              <p>{lecture.lecturer}</p>
              <p>{lecture.faculty}</p>
            </div>
            <ReactStarsRating value={lecture.avg_rating} isEdit={false} isHalf />
          </li>
        </NavLink>
      ));
  };
  return (
    <section className="lectureList">
      <div className='navContainer'>
        <div className='navBar'>
          <input
            className="search"
            placeholder="授業・教授・学部"
            type="text"
            ref={searchInput}
            onKeyUp={updateSearchWord} // キーを話した時に実行
          />
        </div>
      </div>
      <div>
        <ul className='lectureList'>{renderLectures(lectures)}</ul>
      </div>
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
    reviews: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      rating: PropTypes.number,
    })),
  })).isRequired,
};

export default LectureList;