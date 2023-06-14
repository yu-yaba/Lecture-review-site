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

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};