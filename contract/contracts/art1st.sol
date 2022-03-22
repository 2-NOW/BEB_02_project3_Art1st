//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract artist is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 nftPrice;
    

    constructor() ERC721("artist", "ART") {
    nftPrice = 1e18;
    }
    

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, tokenURI);
    return newItemId;
    }
    
    function setToken (address tokenAddress) public onlyOwner returns (IERC20) {
    // 발행한 ERC-20을 불러온다.
    require(tokenAddress != address(0x0));
    token = IERC20(tokenAddress);
    return token;
    }
    
    function callPrice(IERC20 token, address recipient) public view returns (uint256) {
    // NFT 가격과 사용자 잔고를 비교하고 NFT가격을 리턴한다.
    require(token.allowance(msg.sender, recipient) > nftPrice);
    return nftPrice;
    }
    
    function price() public view returns (uint256){
    // 단순히 NFT가격을 리턴한다.
    return nftPrice;
    }
    
    function setPrice(uint256 price) public onlyOwner returns (bool){
    // NFT가격을 입력받고 변경시킨다.
    nftPrice = price;
    return true;
    }
}
