import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import jwt from "jwt-decode";
import { setUser } from "../feature/userSlice";

function* getUserFetch() {
  const token = window.sessionStorage.getItem("token");
  const decodedToken = jwt(token);
  const { data: user } = yield call(() =>
    axios.get(`/api/profile/${decodedToken.id}`, {
      headers: {
        Authorization: token,
      },
    })
  );

  yield put(setUser(user));
}

function* userSaga() {
  yield takeLatest("auth/getUser", getUserFetch);
}

export default userSaga;
