import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LectureList from './LectureList';
import Lecture from './Lecture';
import LectureForm from './LectureForm';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import ImageUpload from './ImageUpload';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';
import ReviewForm from './ReviewForm';
import './Editor.module.css';

const Editor = () => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]); // 画像のURLを保持


  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch(`/api/lectures?page=${currentPage}&limit=60`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setLectures(data);
      } catch (error) {
        handleAjaxError("データが取得できませんでした");
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
      handleAjaxError("授業の登録に失敗しました");
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
      handleAjaxError("レビューの登録に失敗しました");
    }
  };

  const addImage = async (savedImage) => {
    try {
      setImages([...images, savedImage]);
      success('画像を登録しました');
      console.log(savedImage)
      navigate(`/lectures/${savedImage.id}`);
    } catch (error) {
      handleAjaxError("画像の登録に失敗しました");
    }
  };
    
  return (
    <>
      <div > 
        <Header />
      </div>
      <div>
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <Routes>
            <Route path='/' element={<LectureList lectures={lectures} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
            <Route path="new" element={<LectureForm onSave={addLecture} />} />
            <Route path=":id/*" element={<Lecture lectures={lectures} reviews={reviews} addReview={addReview} />} />
            <Route path=":id/newReview" element={<ReviewForm onSave={addReview} />} />
            <Route path=":id/upload" element={<ImageUpload onImageUpload={addImage}/>} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        )}
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default Editor;


