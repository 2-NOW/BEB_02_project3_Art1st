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

    address server; // 서버 계정 고정

    Art1stTokenInterface Art1stTokenContract;

    constructor() ERC721("Art1stNft", "ART") {
        server = _msgSender();
    }
    
    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) { // owner는 batch 컨트랙트가 될 것임.
        require(_msgSender() == server, "ERC721: _msgSender is not equal with server address");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _approve(server, newItemId); // 서버 계정에 approve 하기
        return newItemId;
    }
    
    function setToken (address tokenAddress) public onlyOwner returns (Art1stTokenInterface) {
        // 발행한 ERC-20을 불러온다.
        require(tokenAddress != address(0x0));
        Art1stTokenContract = Art1stTokenInterface(tokenAddress);
        return Art1stTokenContract;
    }

    // NFT 기준 from에서 to임. 돈은 to->from
    function buyNft(address from, address to, uint256 tokenId, uint256 price) external onlyOwner returns (bool) {
        require(tx.origin == server, "ERC721: sender is not server address");
        // 우선, 돈을 입금하고
        Art1stTokenContract.deposit(to, from, price); // 돈은 to -> from
        // 그 다음에 nft의 소유주를 바꿔줌
        _transfer(from, to, tokenId);
        // 다시 server 계정에 approve 걸어주기
        _approve(server, tokenId); 
        
        return true;
    }

}