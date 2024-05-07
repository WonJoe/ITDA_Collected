import React from 'react';

const Complete = () => {

    let birth = 101111; // 출생일 (예: YYMMDD)
    let birthYear = Math.floor(birth / 10000); // 출생 연도
    let adjustedBirthYear = (birthYear > 30) ? 1900 + birthYear : 2000 + birthYear; // 2000년 이후 출생한 경우 보정
    let today = new Date(); // 현재 날짜
    let todayYear = today.getFullYear(); // 현재 연도

    // 한국식 나이 계산
    let age = todayYear - adjustedBirthYear + 1;

    console.log(age); // 계산된 한국식 나이 출력

    return (
        <div>
            회원가입 완료
            <a href='/'>돌아가기</a>
        </div>
    );
};

export default Complete;