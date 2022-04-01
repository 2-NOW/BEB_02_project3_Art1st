// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Art1stToken is ERC20, Ownable {
    address server; 
    
    event Bought(uint256 klay, uint256 tokenAmount);
    event Sold(uint256 tokenAmount, uint256 klay);

    constructor() ERC20("Art1stToken", "AT") {
          // _mint(msg.sender, 100000000e18); -> 새로운 토큰이 발급될 때마다 _mint를 실행
          server = _msgSender();
    }

    // 스왑 기능
    function buy(address to) payable public {
        uint256 amountToBuy = msg.value * 15; // 1:15의 비율로 스왑 진행
        require(amountToBuy > 0, "SWAP: You need to send some ethere");

        _mint(to, amountToBuy); // 토큰 발급
        _approve(to, server, allowance(to, server) + amountToBuy); // approve 금액 변경
        require(balanceOf(to) == allowance(to, server), "SWAP: balance and allowance do not equal after compensation");

        emit Bought(msg.value, amountToBuy);

    }
    
    function sell(address to, uint256 amount) payable public {
        require(amount > 0, "SWAP: You need to sell at least some tokens");

        require(allowance(to, server) >= amount, "SWAP: Check the token balance");

        _spendAllowance(to, server, amount); // allowance 차감
        _burn(to, amount); // 이후 token burn 진행 -> balance는 자동으로 차감
        require(balanceOf(to) == allowance(to, server), "SWAP: balance and allowance do not equal after compensation");

        uint256 klayToSell = amount/15;
        payable(msg.sender).transfer(klayToSell);
        emit Sold(amount, klayToSell);
    }

    // 필요한 기능
    // 1. 토큰 보상
    // 2. 토큰 후원(=> 전송) 기능
    // -> test 필요
    // daemon으로 하려면 나중에 public이 아니라 다르게 바꾸어야 할듯(내부에서 호출할 수 있도록)

    function compensate(address to, uint amount) external onlyOwner returns (bool) {
        require(tx.origin == server, "ERC20: sender is not server address");
        _mint(to, amount); // 토큰 민팅
        _approve(to, server, allowance(to, server) + amount); // approve 금액 변경
        require(balanceOf(to) == allowance(to, server), "ERC20: balance and allowance do not equal after compensation");

        return true;
    }

    function donate(address from, address to, uint amount) external onlyOwner returns (bool) {
        require(tx.origin == server, "ERC20: sender is not server address");
        _spendAllowance(from, server, amount);  // allowance 차감
        _transfer(from, to, amount); // 토큰 후원 진행(실제 balance에서 차감)
        _approve(to, server, allowance(to, server) + amount); // approve 금액 변경
        require(balanceOf(to) == allowance(to, server), "ERC20: to address balance and allowance do not equal after donation");
        require(balanceOf(from) == allowance(from, server), "ERC20: from address balance and allowance do not equal after donation");

        return true;
    }

    // NFT 구매를 위해 입금 하는 함수. donate와 기본적으로 동일하지만, 명시적으로 기능을 나누기 위해 따로 구현.
    function deposit(address from, address to, uint amount) external returns (bool) {
        require(tx.origin == server, "ERC20: sender is not server address");
        _spendAllowance(from, server, amount);  // allowance 차감
        _transfer(from, to, amount); // 토큰 입금 진행(실제 balance에서 차감)
        _approve(to, server, allowance(to, server) + amount); // approve 금액 변경
        require(balanceOf(to) == allowance(to, server), "ERC20: to address balance and allowance do not equal after deposit");
        require(balanceOf(from) == allowance(from, server), "ERC20: from address balance and allowance do not equal after deposit");

        return true;
    }
    
}