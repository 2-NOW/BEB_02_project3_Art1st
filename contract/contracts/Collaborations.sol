// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;


contract Art1stTokenInterface {
    function vote(address voter) external returns (bool) {}
    function deposit(address from, address to, uint amount) external returns (bool) {}
    function burn(uint amount) external returns (bool) {}
}

contract Collaboration {

    event OpenNewEvent(uint eventNum);
    event VoteForNFT(uint eventNum, address voter, uint nftId);
    event DuplicateVote(uint eventNum, address voter, uint nftId); // 중복 투표
    event CompensateForVoting(uint eventNum, address voter, uint amount); // 투표에 대한 보상

    enum EventStatus {
        STATUS_OPEN, // 콜라보레이션 열림
        STATUS_CLOSE, // 콜라보레이션 닫침 
        STATUS_COMPLETE // 보상 완료
    }

    struct Event {
        uint voteCount; // 총 득표 수 => 얼마만큼의 토큰이 모인건지 알 수 있음(한 번의 투표에 1 토큰 씩임)
        uint[5] topNfts; // 득표 수가 많은 상위 5개의 nft들 저장
        EventStatus eventStatus; // 이벤트의 상태
    }

    mapping(uint => mapping(uint => uint)) nftVoteCount; // eventNum => nftId => voteCount (득표수)
    mapping(uint => mapping(uint => address[])) whoVoted; // eventNum => nftId => voterAddr (어떤 사람이 이 nft에 투표했는지)
    mapping(uint => mapping(uint => mapping(address => bool))) isVoted; // address가 해당 token에 투표를 했는지

    mapping(uint => Event) events; // events[1], events[2] ... 식으로 접근 가능
    uint eventLen = 0; // 몇 개의 evnet가 열렸는지

    address art1stTokenAddress; 
    Art1stTokenInterface Art1stTokenContract;

    // 0. constructor 구현
    constructor(address erc20addr){
        art1stTokenAddress = erc20addr;
        Art1stTokenContract = Art1stTokenInterface(erc20addr);
    }

    // 1. 콜라보레이션 이벤트 생성
    function openNewEvent() public returns(uint eventNum) {
        eventLen += 1;
        events[eventLen].voteCount = 0;
        events[eventLen].topNfts = [0, 0, 0, 0, 0];
        events[eventLen].eventStatus = EventStatus.STATUS_OPEN;

        emit OpenNewEvent(eventLen);

        eventNum = eventLen;

    }
    
    // 1-1. 이벤트 닫기
    function closeEvent(uint eventNum) public returns (bool){
        if(events[eventNum].eventStatus != EventStatus.STATUS_OPEN){
            return false;
        }
        else {
            events[eventNum].eventStatus = EventStatus.STATUS_CLOSE;
            return true;
        }
    }

    // 2-1. top nft 찾기
    function _isTop(uint eventNum, uint nft) private returns (bool) {
        uint minCnt = nftVoteCount[eventNum][events[eventNum].topNfts[0]];  // 첫번째 nft의 득표 수로 변경
        uint minIdx = 0;

        // 최소값 찾기, 만약 이미 안에 포함되어 있는 nft라면 굳이 업데이트 할 필요 X
        for (uint8 i = 0; i<5; i++) {
            if(events[eventNum].topNfts[i] == nft) return true;

            if(minCnt > nftVoteCount[eventNum][events[eventNum].topNfts[i]]){
                minCnt = nftVoteCount[eventNum][events[eventNum].topNfts[i]];
                minIdx = i;
            }
        }

        // 이후, 최소값과 비교하고자 하는 nft의 득표 수를 비교
        if(minCnt < nftVoteCount[eventNum][nft]){ // top 5 nft의 득표수 중 최솟값보다 현태 nft의 득표 수가 더 크다면 => top 5 변경
            events[eventNum].topNfts[minIdx] = nft;
        }

        return true;
    }


    // 2. 해당 콜라보레이션에 보팅 진행
    function vote(uint eventNum, address voter, uint nft) public returns(bool) {
        if(isVoted[eventNum][nft][voter] == true){ // 이전에 투표한 적이 있음
            emit DuplicateVote(eventNum, voter, nft);
            return false;
        }
        else{
            events[eventNum].voteCount += 1; // 총 득표수 증가

            nftVoteCount[eventNum][nft] += 1; // 해당 nft에 대한 득표수 하나 추가
            whoVoted[eventNum][nft].push(voter); // 해당 nft에 대해 투표한 사람 추가
            isVoted[eventNum][nft][voter] = true; // 해당 nft에 대해 해당 address가 투표했음을 기록

            _isTop(eventNum, nft); // 이번 투표로 인해 top creator가 바뀌었는지 확인

            Art1stTokenContract.vote(voter); // 보팅을 위해 1토큰 지급(해당 컨트랙트에 잔액이 쌓임)

            emit VoteForNFT(eventNum, voter, nft);

            return true;
        }

    }

    // 3. 보팅이 끝난 후에 30프로 burn
    // 4. 보팅이 끝난 후에 70프로는 보상 진행
    function _compensateForVoter(uint eventNum, uint amount) private returns (bool) {
        for(uint8 i = 0; i<5; i++){
            uint topNft = events[eventNum].topNfts[i];

            for(uint j=0; j<whoVoted[eventNum][topNft].length; j++) {
                Art1stTokenContract.deposit(address(this), whoVoted[eventNum][topNft][j], amount);
                emit CompensateForVoting(eventNum, whoVoted[eventNum][topNft][j], amount); 
            }
        }
        return true;
    }

    function distribute(uint eventNum) public returns (bool){
        // 상위 5개 작품의 전체 득표수 합계를 계산
        uint totalTopVotes = 0;
        for(uint8 i=0; i<5; i++){
            totalTopVotes += nftVoteCount[eventNum][events[eventNum].topNfts[i]];
        }
        
        // 70% 보상
        uint amountToCompensate = events[eventNum].voteCount * 1e17 * 7;
        uint amountToCompensatePerVoter = amountToCompensate / totalTopVotes;
        _compensateForVoter(eventNum, amountToCompensatePerVoter);


        // 30%(나머지) burn 
        uint amountToBurn = (events[eventNum].voteCount * 1e18) - amountToCompensate; // 1e18 * 0.3 == 1e17 * 3
        Art1stTokenContract.burn(amountToBurn);

        // event 보상 완료
        events[eventNum].eventStatus = EventStatus.STATUS_COMPLETE;
        return true;
    }

    // 기타 조회 function
    function getVoteCount(uint eventNum, uint nftId) view public returns (uint){
        return nftVoteCount[eventNum][nftId];
    }
    function getIsVoted(uint eventNum, uint nftId, address who) view public returns (bool) {
        return isVoted[eventNum][nftId][who];
    }
    function getVoterList(uint eventNum, uint nftId) view public returns (address[] memory){
        return whoVoted[eventNum][nftId];
    }
    function getTopFive(uint eventNum) view public returns (uint[5] memory) {
        return events[eventNum].topNfts;
    }
    function getTotalVotes(uint eventNum) view public returns (uint) {
        return events[eventNum].voteCount;   
    }

}