import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./feature/userSlice";
import userSaga from "./saga/userSaga";

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
  middleware: [saga],
});
saga.run(userSaga);

export default store;
