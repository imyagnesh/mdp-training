import { takeEvery, call, put } from 'redux-saga/effects';

function* loadAuthor() {
  try {
    console.log('loadAuthor');
    const res = yield call(fetch, 'http://localhost:3004/authors');
    const authors = yield res.json();
    yield put({ type: 'LOAD_AUTHORS_SUCCESS', payload: authors });
  } catch (error) {
    yield put({ type: 'LOAD_AUTHORS_ERROR', payload: error });
  }
}

export default function* loadAuthorsRequest() {
  yield takeEvery('LOAD_AUTHORS_REQUEST', loadAuthor);
}
