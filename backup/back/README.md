Backend 세팅 방법
==============
## install
back 폴더와 contract 폴더 두 군데에서 모두 npm install을 먼저 실행해 주세요.
<br>
<br>
## .env 파일 설명
1. back 폴더 바로 아래에 .env 파일 생성
2. .env 파일 안의 내용은 .env.example 참고

```
# DB
MYSQL_HOST = 내 MySQL host 주소
MYSQL_USER = 내 MySQL user 이름
MYSQL_PW = 내 MySQL password
MYSQL_NAME = 내 MySQL에서 database로 사용할 이름(전 art1st로 했습니다.)
MYSQL_PORT = 내 MySQL connection 포트 번호
SERVER_PRIVATEKEY = server용 계정의 private key
SERVER_ADDRESS = server용 계정의 address
SERVER_ID = server용 계정의 id(users 테이블의 id column 입니다)

# Web3
WEB3_NETWORK = 일단은 가나슈에서 테스트를 진행하고 있어 가나슈 네트워크 주소 넣어주시면 됩니다(web3 연결 용도)

# GANACHE
GANACHE_ADDRESS = 가나슈 어카운트 중 하나의 주소(test용으로 eth faucet 하는 용도)
GANACHE_PRIVATEKEY = 위에서 적은 가나슈 어카운트의 private key

# Contract
ERC20_ADDRESS = ERC20 컨트랙트 배포 후 반환되는 ERC20 컨트랙트 주소
BATCHER_ADDRESS = 트랜잭션 일괄 처리를 위한 컨트랙트. Batcher 컨트랙트 배포 후 반환되는 주소
``` 

3. 우선은 MYSQL이랑 Web3, GANACHE 관련 부분부터 채워주시고, 디비 생성하시면 됩니다.
4. 이후, 테이블 생성이 완료되면 수근님께서 만드신 signup api 통해서 서버용 계정 만들어 주시고 SERVER 관련 내용 채워주시면 되요.
5. 마지막으로 Contract 배포(api 통해서 진행 가능)하시고 각각 반환되는 Address 값들 순차적으로 넣어주시면 됩니다.
6. 각 env 파일 부분 채울 때마다 전 서버를 재시작하긴 하는데.. 재시작 안해도 변경 사항들이 다 잘 반영되는지는 모르겠네요. 진행하다가 잘 안되시는거 같으면 서버 재시작 해보시는걸 추천드립니다 .. 하하

<br>
<br>

## DB 세팅 관련
1. 위의 .env 파일에 적어 둔 MYSQL_NAME과 동일하게 MySQL 상에 우선 데이터 베이스를 생성해 줍니다. (mysql에 접속하여 실행)
    ```
    mysql> CREATE DATABASE [MYSQL_NAME];
    ```
2. 그리고 서버를 키면, 각각의 테이블들이 생성됩니다. 
    ```
    npm run start
    ```
    * 초기에 세팅해 놨던 DB 스키마와 달라진 부분들이 있습니다.<br>
    이전에 이미 database를 만드신 적이 있다면 database 자체를 drop 했다가 다시 생성한 후 서버를 켜주세요.<br>
    그럼 다시 데이터 베이스가 생성됩니다.
        ```
        mysql> DROP DATABASE [MYSQL_NAME];
        ```
    * 기존 데이터가 있어서 데이터 베이스 자체를 삭제하기가 어려우시다면 sequelize migration 이용하셔도 되긴 하는데, <br>
    제가 donation_transactions에서 column 지우는 부분은 구현을 아직 안해서 조금 복잡하게 진행하셔야 합니다. 8ㅁ8
        ```
        1. mysql 상에서 donation_transactions 삭제 
            mysql> DROP TABLE donation_transactions;
        2. 서버 재실행
            npm run start
        3. 이후 sequelize migration 진행
            sequelize db:migrate --env development
        ```
    * NFT 구매 기능을 구현하면서, orderbooks 테이블에도 변경 사항이 있습니다.<br>
      이전에는 ERC20 과 관련된 후원 기능과 보상 기능만이 존재했기 때문에 action 컬럼에 들어 갈 수 있는 부분이 compensate(보상), donate(후원) 뿐이었는데,<br>
      NFT 구매 기능을 추가하면서 purchase(구매) 까지 들어갈 수 있게 수정했고, Nft 구매 시에 필요한 tokenId 값도 컬럼으로 추가했습니다.
      tokenId 값은 Null 값도 가능하며, 보상 기능과 후원 기능일 때에는 Null 값으로 테이블에 들어갑니다.
      ```
      1. mysql 상에서 orderbooks를 삭제한 후 서버 재실행
        mysql> DROP TABLE orderbooks;
      2. 혹은, orderbooks 테이블에 이미 저장된 값이 있어서 drop 하기 애매하다면 migration 사용
        sequelize db:migrate --env development
      ```
<br>
<br>

## server용 계정 관련
1. 수근님이 만드신 signup api를 통해 user를 추가할 수 있습니다.<br>
(더 자세한 내용은 노션을 참고해 주세요.)
    ```
    endpoint: http://localhost:4000/user/signup
    ```
2. 위 api를 통해 server용으로 만들 계정을 만들어 줍니다. 
3. 이후 env 파일에 server용 계정의 주소와 비밀키, 그리고 users 테이블 상에서의 id 값을 작성해 줍니다. 

<br>
<br>

## 가나슈 관련
가나슈는 이제 사용하지 않습니다.
(바오밥 네트워크로 포팅 완료)

<br>
<br>

## 컨트랙트 배포 관련
우선, 컨트랙트 배포와 관련된 것들을 모두 api로 처리할 수 있게 해놓았습니다. (-> postman 이용)<br>
1. 컨트랙트 배포를 위해 서버용 계정에 Klay를 충전합니다. <br>
    (150KLAY씩 충전 가능 -> 원래 그런진 모르겠지만 일단 전 150 클레이씩 되더라구요 하하)
    ```
    https://baobab.wallet.klaytn.com/access?next=faucet
    ```
    서버 계정의 Klay 잔액은 다음의 api로 조회할 수 있습니다.
    ```
    [GET] http://localhost:4000/klaytn/getServerKlay
    ```
2. ERC20 토큰 관련 컨트랙트를 먼저 배포합니다.
    ```
    [POST] http://localhost:4000/klaytn/erc20
    ```
    이후 contract 주소와 contract가 배포된 트랜잭션의 hash가 반환되는데, 이 중 contract 주소를 .env 파일에 작성합니다. 
3. ERC721 토큰 관련 컨트랙트를 배포합니다. 
    ```
    [POST] http://localhost:4000/klaytn/erc721
    ```
    여기서도 contract 주소와 tx hash 값이 반환됩니다. 
4. Batcher 관련 컨트랙트를 배포합니다. 
    ```
    [POST] http://localhost:4000/klaytn/batcher
    ```
    이 역시 contract 주소와 tx hash 값이 반환되는데, 이 중 contract 주소를 .env 파일에 작성해줍니다.
5. 이때, .env 파일에 컨트랙트 주소가 작성되어 있다면 컨트랙트 배포를 다시 진행할 수 없게 구현해놨기 때문에 <br>
만약 컨트랙트의 재배포가 필요한 경우에는 .env 파일에서 컨트랙트 관련 부분을 빈 칸으로 수정한 후 배포해야 합니다.<br>
그리고, 혹시 모를 에러를 대비하기 위해, 컨트랙트 하나 배포할 때마다 .evn 파일 수정하시고 서버 껏다 키는 것을 추천드려요. <br>
추후에 시간이 남으면 더 간단한 로직으로 바꿀 수 있을지 정리해 보겠습니다. 🥲

<br>
<br>

## daemon 관련
daemon은 pm2를 통해 실행되며, <br> 
여러 order들을 모아 transaction을 보내는 서버와 pending된 transaction들이 블록에 포함되었는지 확인하는 서버가 있습니다. <br>
터미널 창에서 아래 명령어를 이용하여 10초에 한 번씩 재실행 되는 daemon 서버를 실행할 수 있습니다. 
```
npm run sendTx
npm run checkTx
```
만약, 10초 단위가 아니라 다른 단위로 실행시키고 싶으시다면 <br>
package.json에서 아래 명령어 중 '--cron' 부분 원하시는 대로 수정하시면 됩니다. 
```
"sendTx": "pm2 start --watch --cron \"*/10 * * * * *\" src/daemon/sendTx.js",
"checkTx":  "pm2 start --watch --cron \"*/10 * * * * *\" src/daemon/checkTx.js"
```
<br>
즉, 서버 실행을 위해서는 총 3개의 서버를 띄워야 하는 것인데,

```
1. npm run start
2. npm run sendTx
3. npm run checkTx
```
이렇게 3가지 명령어를 각각 다른 터미널창(back 폴더로 이동해야 함)에서 실행시키면 됩니다.<br>
사실, npm run sendTx랑 npm run checkTx는 pm2로 올리는 거라 같은 터미널에서 실행 시키셔도 되요. <br>
둘 다 실행 시킨 후에 pm2 monit 명령어 이용하시면 각각 10에 한번씩 재실행 되면서 로그 뿌리는거 확이하실 수 있습니다.
