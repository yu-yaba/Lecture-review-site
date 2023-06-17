import React from "react";
import PropTypes from 'prop-types';

const MAX_PAGE_NUMBERS = 5;
const MAX_PAGES = 20;

const Pagination = ({
  currentPage,
  setCurrentPage,
}) => {
  // 3以上の時は現在のページから2ページ前を下限とすることで、現在のページを中心に5ページを表示する
  const lowerLimit = currentPage < 3 ? 1 : currentPage - 2;
  // 上限は下限+4ページとするが、上限が20を超える場合は20とする
  const upperLimit =
    lowerLimit + MAX_PAGE_NUMBERS - 1 > MAX_PAGES
      ? MAX_PAGES
      : lowerLimit + MAX_PAGE_NUMBERS - 1;

  // 次のページボタンの関数、max関数で1以下にならないようにする
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  // 前のページボタンの関数、min関数で20以上にならないようにする

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, MAX_PAGES));
  };

  const handleSetPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
        {"<<"}
      </button>
      {/* 5つの配列を展開する アンダースコアは引数だが、使われていない変数 */}

      {[...Array(upperLimit - lowerLimit + 1)].map((_, index) => {
        const pageNumber = lowerLimit + index;
        return (
          <button
            type="button"
            key={pageNumber}
            onClick={() => handleSetPage(pageNumber)}
            disabled={pageNumber === currentPage}
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