//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Art1stTokenInterface {
    function deposit(address from, address to, uint amount) external returns (bool) {}
}

contract Art1stNft is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public prices; // 각각의 nft 가격이 다를 수 있음
    address server; // 서버 계정 고정

    Art1stTokenInterface Art1stTokenContract;

    constructor() ERC721("Art1stNft", "ART") {
        server = _msgSender();
    }
    
    function mintNFT(address recipient, string memory tokenURI, uint256 price) public returns (uint256) { // owner는 batch 컨트랙트가 될 것임.
        require(_msgSender() == server, "ERC721: _msgSender is not equal with server address");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _approve(server, newItemId); // 서버 계정에 approve 하기
        prices[newItemId] = price; // NFT를 생성할 때에 NFT의 판매 여부와 가격을 설정할 수 있음.
        return newItemId;
    }
    
    function setToken (address tokenAddress) public onlyOwner returns (Art1stTokenInterface) {
        // 발행한 ERC-20을 불러온다.
        require(tokenAddress != address(0x0));
        Art1stTokenContract = Art1stTokenInterface(tokenAddress);
        return Art1stTokenContract;
    }

    function buyNft(address from, address to, uint256 tokenId, uint256 price) external onlyOwner returns (bool) {
        // 구매하려는 가격이랑 NFT 자체의 가격이 같은지 비교
        require(prices[tokenId] == price, "ERC721: price does not match");
        // 우선, 돈을 입금하고
        Art1stTokenContract.deposit(from, to, price);
        // 그 다음에 nft의 소유주를 바꿔줌
        _transfer(from, to, tokenId);
        // 다시 server 계정에 approve 걸어주기
        _approve(server, tokenId); 
        
        return true;
    }
    
    // function callPrice(IERC20 token, address recipient) public view returns (uint256) {
    //     // NFT 가격과 사용자 잔고를 비교하고 NFT가격을 리턴한다.
    //     require(token.allowance(msg.sender, recipient) > nftPrice);
    //     return nftPrice;
    // }
    
    function getPrice(uint256 tokenId) public view returns (uint256){
        // 해당 tokenId에 대한 NFT가격을 리턴한다.
        return prices[tokenId]; 
    }
    
    function setPrice(uint256 tokenId, uint256 price) public returns (bool){
        require(_msgSender() == server, "ERC721: _msgSender is not equal with server address");
        // token id와 NFT가격을 입력받고 해당 tokenid의 가격을 변경한다.
        prices[tokenId] = price;
        return true;
    }
}