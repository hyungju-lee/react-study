import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { BrowserRouter } from "react-router-dom";

// Provider 컴포넌트 import 해오기
import {Provider} from 'react-redux';
// createStore 함수 import 해오기
import {combineReducers, createStore} from "redux";

let alertDefault = true;

function reducer2(state = alertDefault, action) {
    if (action.type === 'alert닫기') {
        state = false;
        return state;
    } else {
        return state;
    }
}

let defaultState = [
    { id: 11, name: '흐음', quan: 2 },
    { id: 12, name: '되긴되네', quan: 10 },
    { id: 13, name: '재밌긴하군', quan: 8 }
]

// reducer는 수정된 state 데이터를 return하는 함수입니다.
// 아래 파라미터 작성법은 default parameter 문법입니다. 파라미터의 초기값을 설정하는 문법이라고 생각하시면 됩니다.
function reducer(state = defaultState, action) {
    // dispatch로 보낸 object 데이터는 action 인자에 들어있음
    // action.type : 데이터를 수정하는 조건
    // 수량증가라는 데이터 수정방법을 정의한 것
    if (action.type === '항목추가') {
        // deep copy
        const stateCopy = [...state];
        let stateCopyIndex;
        for (const [index, value] of stateCopy.entries()) {
            if (value.id === action.payload.id) {
                stateCopyIndex = index;
                break;
            }
        }
        if (stateCopyIndex) {
            stateCopy[stateCopyIndex].quan++;
        } else {
            stateCopy.push(action.payload);
        }
        return stateCopy;
    } else if (action.type === '수량증가') {
        // deep copy
        const stateCopy = [...state];
        let stateCopyIndex;
        for (const [index, value] of stateCopy.entries()) {
            if (value.id === action.index) {
                stateCopyIndex = index;
                break;
            }
        }
        stateCopy[stateCopyIndex].quan++;
        return stateCopy;
    } else if (action.type === '수량감소') {
        // deep copy
        const stateCopy = [...state];
        let stateCopyIndex;
        for (const [index, value] of stateCopy.entries()) {
            if (value.id === action.index) {
                stateCopyIndex = index;
                break;
            }
        }
        stateCopy[stateCopyIndex].quan = stateCopy[stateCopyIndex].quan - 1 < 0 ?
            0 : stateCopy[stateCopyIndex].quan - 1;
        return stateCopy;
    } else {
        return state
    }
}

// createStore() 안에 state 초기값 저장
let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          {/* <Provider>로 <App> 감싸기 */}
          {/* Provider로 감싸진 애들은 props 없이도 state 공유 가능 */}
          {/* Provider에 props 전송 */}
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  // App 컴포넌트를 index.html 파일의 root 아이디를 가진 요소에 넣어주세요~
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
