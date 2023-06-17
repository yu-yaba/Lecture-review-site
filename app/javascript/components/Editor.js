import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import LectureList from './LectureList';
import Lecture from './Lecture';
import LectureForm from './LectureForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';
import ReviewForm from './ReviewForm';

const Editor = () => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // Add state for reviews
  const [reviews, setReviews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch(`/api/lectures?page=${currentPage}&limit=60`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setLectures(data);
      } catch (error) {
        handleAjaxError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const addLecture = async (newLecture) => {
    try { // tryはエラーが起きる可能性のある処理を囲む
      const response = await window.fetch('/api/lectures', {
        method: 'POST', // リクエストのHTTPメソッドをPOSTに指定
        body: JSON.stringify(newLecture), //  送信するデータをJSON形式に変換、bodyは送信する情報
        headers: { // headersは送信する情報の形式などの詳細
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const savedLecture = await response.json();
      const newLectures = [...lectures, savedLecture]; // 既存のLecturesに新しいイベントを追加し、新しい配列を作成
      setLectures(newLectures);
      success('授業を登録しました');
      navigate(`/lectures/${savedLecture.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };


  const addReview = async (reviewWithLectureId) => {
    try {
      const response = await fetch(`/api/lectures/${reviewWithLectureId.lecture_id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewWithLectureId),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw Error(response.statusText);

      const savedReview = await response.json();
      setReviews([...reviews, savedReview]);
      success('レビューを登録しました');
      navigate(`/lectures/${reviewWithLectureId.lecture_id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <Header />
      <div className="grid">
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <Routes>
            <Route path='/' element={<LectureList lectures={lectures} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
            <Route path="new" element={<LectureForm onSave={addLecture} />} />
            <Route path=":id/*" element={<Lecture lectures={lectures} reviews={reviews} addReview={addReview} />} />
            <Route path=":id/newReview" element={<ReviewForm onSave={addReview} />} />
          </Routes>
        )}
      </div>
    </>
  );
};

export default Editor;