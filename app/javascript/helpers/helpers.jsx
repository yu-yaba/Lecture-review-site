import { error } from "./notifications";

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const validateLecture = (lecture) => {
  const errors = {}; // 空のオブジェクトを作成し、エラーがある場合にエラーメッセージを格納する

  if (lecture.title === '') {
    errors.title = '授業名を入力してください';
  }

  if (lecture.lecturer === '') {
    errors.lecturer = '教授/講師名を入力してください';
  }

  if (lecture.faculty === '') {
    errors.faculty = '開講番号:学部を入力してください';
  }

  return errors;
};

export const validateReview = (review) => {
  const errors = {}; // 空のオブジェクトを作成し、エラーがある場合にエラーメッセージを格納する

  if (review.rating === '') {
    errors.rating = '評価を入力してください';
  }

  if (review.period_year === '') {
    errors.period_year = '授業を受講した年を入力してください';
  }

  if (review.period_term === '') {
    errors.period_term = '授業を受講したタームを入力してください';
  }

  if (review.textbook === '') {
    errors.textbook = '教科書の有無を入力してください';
  }

  if (review.attendance === '') {
    errors.attendance = '出席確認の有無を入力してください';
  }

  if (review.grading_type === '') {
    errors.grading_type = '採点方法を入力してください';
  }

  if (review.content_difficulty === '') {
    errors.content_difficulty = '単位取得の難易度を入力してください';
  }
  
  if (review.content_quality === '') {
    errors.content_quality = '内容の充実度を入力してください';
  }

  if (review.content === '') {
    errors.content = 'コメントを入力してください';
  }


  return errors;
};

export const handleAjaxError = (err) => {
  error(err);
  console.error(err);
};