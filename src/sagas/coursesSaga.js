import { takeEvery, call, put } from 'redux-saga/effects';

function* loadAuthor() {
  try {
    const res = yield call(fetch, 'http://localhost:3004/courses');
    const courses = yield res.json();
    yield put({ type: 'LOAD_COURSES_SUCCESS', payload: courses });
  } catch (error) {
    yield put({ type: 'LOAD_COURSES_ERROR', payload: error });
  }
}

export default function* loadAuthorsRequest() {
  yield takeEvery('LOAD_COURSES_REQUEST', loadAuthor);
}
