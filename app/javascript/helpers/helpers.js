import { error } from "./notifications";


export const isEmptyObject = obj => Object.keys(obj).length === 0;


export const validateLecture = (lecture) => {
  const errors = {}; // 空のオブジェクトを作成し、エラーがある場合にエラーメッセージを格納する

  if (lecture.title === '') {
    errors.title = 'You must enter a title';
  }

  if (lecture.lecturer === '') {
    errors.lecturer = 'You must enter at least one le.lecturer';
  }

  if (lecture.faculty === '') {
    errors.faculty = 'You must enter at least one faculty';
  }

  return errors;
};

export const validateReview = (review) => {
  const errors = {}; // 空のオブジェクトを作成し、エラーがある場合にエラーメッセージを格納する

  if (review.rating === '') {
    errors.rating = 'You must enter a rating';
  }

  if (review.period === '') {
    errors.period = 'You must enter at least one le.period';
  }

  if (review.textbook === '') {
    errors.textbook = 'You must enter textbook';
  }

  if (review.attendance === '') {
    errors.attendance = 'You must enter a attendance';
  }

  if (review.grading_type === '') {
    errors.grading_type = 'You must enter a grading_type';
  }

  if (review.content_difficulty === '') {
    errors.content_difficulty = 'You must enter a content_difficulty';
  }
  
  if (review.content_quality === '') {
    errors.content_quality = 'You must enter a content_quality';
  }

  if (review.content === '') {
    errors.content = 'You must enter a content';
  }


  return errors;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};