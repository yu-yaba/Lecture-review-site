import React from "react";
import PropTypes from 'prop-types';
import "./Pagination.css";

const MAX_PAGE_NUMBERS = 3;
const MAX_PAGES = 100;

const Pagination = ({
  currentPage,
  setCurrentPage,
}) => {
  // 3以上の時は現在のページから2ページ前を下限とする
  const lowerLimit = currentPage < 3 ? 1 : currentPage - 2;
  // 上限は下限+2ページとするが、上限が100を超える場合は100とする
  const upperLimit =
    lowerLimit + MAX_PAGE_NUMBERS - 1 > MAX_PAGES
      ? MAX_PAGES
      : lowerLimit + MAX_PAGE_NUMBERS - 1;

  // 前のページボタンの関数、max関数で1以下にならないようにする
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  // 次のページボタンの関数、min関数で100以上にならないようにする

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, MAX_PAGES));
  };

  const handleSetPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
        {"<<"}
      </button>
      {/* 3つの配列を展開する アンダースコアは引数だが、使われていない変数 */}

      {[...Array(upperLimit - lowerLimit + 1)].map((_, index) => {
        const pageNumber = lowerLimit + index;
        return (
          <button
            type="button"
            key={pageNumber}
            onClick={() => handleSetPage(pageNumber)}
            disabled={pageNumber === currentPage}
            className={pageNumber === currentPage ? "currentPage" : ''}
          >
            {pageNumber}
          </button>
        );
      })}
      <button type="button" onClick={handleNext} disabled={currentPage === MAX_PAGES}>
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}