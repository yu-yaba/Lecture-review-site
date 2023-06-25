/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import ReactStarsRating from 'react-awesome-stars-rating';
import { IconContext } from 'react-icons'
import { RiAddCircleLine } from 'react-icons/ri';
import Pagination from './Pagination';
import './LectureList.module.css';

const LectureList = ({ lectures }) => {
  // searchTermでフォームの値を管理
  const [searchTerm, setSearchTerm] = useState('');
  // searchInputでフォームの初期値をnull
  const searchInput = useRef(null);
  // 現在のページを管理
  const [currentPage, setCurrentPage] = useState(1);

  // 1ページあたりのレクチャー数
  const lecturesPerPage = 10;

  const updateSearchTerm = () => {
    // useRef.currentで参照した値に更新
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    // eslint-disable-next-line camelcase
    const { id, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some((value) =>
      value
        .toString()  // Converts all values to string to avoid errors
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  const renderLectures = (lectureArray) => {
    const filteredLectures = lectureArray.filter((el) => matchSearchTerm(el));


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
  }; return (
    <section className="lectureList">

      <div className='navContainer'>
        <div className='navBar'>
          <input
            className="search"
            placeholder="検索"
            type="text"
            ref={searchInput}
            onKeyUp={updateSearchTerm} // キーを話した時に実行
          />

          <Link to="/lectures/new" className='addButton'>
            {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
            <IconContext.Provider value={{ color: '#77787B', size: '2.3em' }}>
              <RiAddCircleLine />
            </IconContext.Provider>
          </Link>
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