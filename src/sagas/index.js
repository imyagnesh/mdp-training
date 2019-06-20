import { all } from 'redux-saga/effects';
import authorsSaga from './authorsSaga';
import coursesSaga from './coursesSaga';

export default function* rootSaga() {
  yield all([authorsSaga(), coursesSaga()]);
}
