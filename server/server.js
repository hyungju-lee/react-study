const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
http.listen(8080, function () {
    console.log('listening on 8080');
})

// 미들웨어 : 서버의 요청과 응답 사이에 실행할 코드
// 페이지를 잘 가져오려면 html, css, js, img 파일들 담긴 곳을 명시
// react-project/build 폴더 안에있는 스태틱 파일들을 쓰겠습니다 라는 뜻
app.use('/', express.static(path.join(__dirname, 'public')));
// 유저가 /react 포함된 URL로 요청시 요청과 응답 사이에 실행할 코드
app.use('/react', express.static(path.join(__dirname, 'react-project/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/main.html'));
})

app.get('/react', function (req, res) {
    res.sendFile(path.join(__dirname, 'react-project/build/index.html'));
})

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'react-project/build/index.html'));
// })