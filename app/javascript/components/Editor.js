import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import LectureList from './LectureList';
import Lecture from './Lecture';
import LectureForm from './LectureForm';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Editor = () => {
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const response = await window.fetch('/api/lectures');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setLectures(data);
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

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
      success('Lecture Added!');
      navigate(`/lectures/${savedLecture.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const deleteLecture = async (lectureId) => {
    const sure = window.confirm('Are you sure?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/lectures/${lectureId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('Lecture Deleted!');
        navigate('/lectures');
        setLectures(lectures.filter(lecture => lecture.id !== lectureId)); // lecturesから削除したイベントを除いた配列を作成
      } catch (error) {
        handleAjaxError(error);
      }
    }
  };

  const updateLecture = async (updatedLecture) => {
    try {
      const response = await window.fetch(
        `/api/lectures/${updatedLecture.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedLecture),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) throw Error(response.statusText);
  
      const newLecture = lectures;
      const idx = newLecture.findIndex((lecture) => lecture.id === updatedLecture.id);
      newLecture[idx] = updatedLecture;
      setLectures(newLecture);
  
      success('Lecture Updated!');
      navigate(`/lectures/${updatedLecture.id}`);
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
          <>
            <Routes>
              <Route path='/' element={<LectureList lectures={lectures} />} />
            </Routes>

            <Routes>
              <Route path="new" element={<LectureForm onSave={addLecture} />} />
              <Route path=":id/edit" element={<LectureForm lectures={lectures} onSave={updateLecture} />}/>
              <Route path=":id" element={<Lecture lectures={lectures} onDelete={deleteLecture} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default Editor;