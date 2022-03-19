import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import router from '../api/index.js';

export default async ({ app }) => {
    app.use(
        session({
          secret: 'art1stProject5',  //암호화하는 데 쓰일 키
          resave: false, // 세션을 언제나 저장할지 설정함 (?)
          saveUninitialized: true, //세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
          cookie: {
            domain: `localhost`,  // 클라는 서버도메인이 설정과 같아야 쿠키전송가능
            path: '/', // 해당 path를 만족하면 쿠키 보내줌
            maxAge: 24 * 6 * 60 * 10000,
            sameSite: 'none',
            httpOnly: true, // 스크립트 접근 막기
            secure: true, // http 통신 쿠키 허용
          },
        })
      );
    app.use(express.json({ strict : true }))
    app.use(bodyParser.urlencoded({extended: true})); // 중첩된 객체 파싱 가능
    app.use(bodyParser.json());
    app.use(cors({
        origin: "*",
        credentials: true
    }));

    app.use('/', router);

    return app;
}