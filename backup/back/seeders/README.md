# 테스트 환경셋팅 기본 데이터 seed 생성방법

sequelize db:seed:all 로 데이터를 삽입할 경우 참조 테이블이 정의되어있지 않는 상태에서 추가할 경우 오류가 발생합니다. 아래의 순서로 명령어를 입력해야 참조 테이블을 먼저 생성해서 에러를 해결할 수 있습니다.

1. sequelize db:seed --seed 20220401203033-user.js

2. sequelize db:seed --seed 20220401215536-collaboration.js

3. sequelize db:seed --seed 20220401205807-artwork.js

4. sequelize db:seed --seed 20220401213114-profile.js

5. sequelize db:seed --seed 20220401214400-hashtag.js
