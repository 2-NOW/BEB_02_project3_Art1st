# 컨트랙트 관련

### Collaborations.sol

- interface : Art1stTokenInterace
    - 총 ERC20 컨트랙트 중 3개의 함수를 받아와서 사용할 수 있습니다.
    - vote : 사용자가 투표를 진행할 때에 1토큰만큼을 사용자의 address에서 collaboration의 address로 이동
    - compensate : 투표를 종료한 후, 사용자에게 보상을 진행
        
        이 부분은 보상 1번 당 1번씩 compensate를 호출하게 되는데, 그러면 너무 컨트랙트 메소드 호출을 많이 하는게 아닌가 싶긴 하네요.. 8ㅁ8
        
    - burn : 투표를 종료한 후, 총 토큰의 30프로를 burn
    
- 변수 설명
    - Event : collaboration 하나 당 Event 객체 하나씩 생성
        - voteCount : 해당 event의 총 득표 수
        - topNfts : 득표수가 많은 상위 5개의 token Id array
        - eventStatus: 이벤트의 상태
    - EventStatus :
        - STATUS_OPEN : event 열림
        - STATUS_CLOSE : 콜라보레이션 닫침
        - STATUS_COMPLETE : 보상 완료
    - nftVoteCount : eventNum ⇒ tokenId ⇒ voteCount(득표수) 매핑
        - 해당 tokenId 각각의 득표수를 저장합니다.
    - whoVoted : eventNum ⇒ tokenId ⇒ address[]
        - 해당 tokenId에 투표한 address들을 저장합니다.
    - isVoted : eventNum ⇒ tokenID ⇒ address ⇒ bool
        - 해당 tokenId에 address들이 투표한 적이 있는지 저장합니다.
    
- 메서드 관련
    - constructor
        
        ERC20 컨트랙트를 캐스팅 하기 때문에, 먼저 배포된 ERC20의 컨트랙트를 파라미터로 받아 인터페이스를 생성합니다.
        
    - openNewEvent
        
        하나의 콜라보레이션 이벤트를 생성합니다. 
        
        0부터 시작합니다. 
        
    - closeEvent
        
        콜라보레이션 이벤트의 상태를 close로 변경합니다. 
        
        (관련해서 따로 작성한 코드는 아직 없지만, close 상태로 변경되면 더이상 투표를 하지 않게 수정할 수 있어요. 
        
    - _isTop
        
        투표가 진행될 때마다 상위 5개의 nft가 무엇인지 새롭게 확인합니다.
        
        찾아보니, mapping을 loop로 다 도는건 시간과 가스비 측면에서 불리하다고 해서, 이렇게 구현했습니다.
        
    - vote
        
        해당 콜라보레이션 이벤트에 대해서 보팅을 진행합니다. 
        
        파라미터는 eventNum(해당 이벤트의 번호)와 voter(투표를 진행한 사람의 주소), nft(투표자가 투표한 작품의 tokenId) 입니다. 
        
        vote를 데몬 서버를 통해서 처리할 수도 있을 것 같아서 투표를 진행한 사람의 주소까지 받도록 해놓았어요.
        
    - _compensateForVoter
        
        상위 5개의 작품에 투표한 사람들에게 보상을 진행합니다.
        
    - distribution
        
        보팅이 끝난 후, 토큰의 재분배를 처리합니다. 
        
        30프로 → burn
        
        70프로 → 투표한 유저들에게 다시 분배