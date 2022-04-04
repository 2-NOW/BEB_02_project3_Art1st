// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Art1stToken is ERC20 {
    address server; 
    
    event Bought(uint256 klay, uint256 tokenAmount);
    event Sold(uint256 tokenAmount, uint256 klay);

    constructor() ERC20("Art1stToken", "AT") {
          server = _msgSender();
    }

    // 스왑 기능
    function buy(address to) payable public {
        uint256 amountToBuy = msg.value * 15; // 1:15의 비율로 스왑 진행
        require(amountToBuy > 0, "SWAP: You need to send some ethere");

        _mint(to, amountToBuy); // 토큰 발급
        _approve(to, server, allowance(to, server) + amountToBuy); // approve 금액 변경
        require(balanceOf(to) == allowance(to, server), "SWAP: balance and allowance do not equal after swap");

        emit Bought(msg.value, amountToBuy);

    }
    
    function sell(address to, uint256 amount) payable public {
        require(amount > 0, "SWAP: You need to sell at least some tokens");

        require(allowance(to, server) >= amount, "SWAP: Check the token balance");

        _spendAllowance(to, server, amount); // allowance 차감
        _burn(to, amount); // 이후 token burn 진행 -> balance는 자동으로 차감
        require(balanceOf(to) == allowance(to, server), "SWAP: balance and allowance do not equal after swap");

        uint256 klayToSell = amount/17;
        payable(msg.sender).transfer(klayToSell);
        emit Sold(amount, klayToSell);
    }

    // 토큰 보상 지급
    function compensate(address to, uint amount) external returns (bool) {
        require(tx.origin == server, "ERC20: sender is not server address");
        _mint(to, amount); // 토큰 민팅
        _approve(to, server, allowance(to, server) + amount); // approve 금액 변경
        require(balanceOf(to) == allowance(to, server), "ERC20: balance and allowance do not equal after compensation");

        return true;
    }

    // 후원금 전송
    function donate(address from, address to, uint amount) external returns (bool) {
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

    // voting을 위한 기능.
    function vote(address voter) external returns (bool) {
        require(tx.origin == server, "ERC20: sender is not server address");
        _spendAllowance(voter, server, 1e18); // 1 token만큼 allowance 차감
        _transfer(voter, _msgSender(), 1e18); // collaboration 컨트랙트로 1 token 송금
        _approve(_msgSender(), server, allowance(_msgSender(), server) + 1e18); // collaboration 컨트랙트의 approve 금액 변경
        require(balanceOf(voter) == allowance(voter, server), "ERC20: voter address balance and allowance do not equal after voting");
        require(balanceOf(_msgSender()) == allowance(_msgSender(), server), "ERC20: collaboration address balance and allowance do not equal after voting");

        return true;
    }

    // voting 이후 burn 
    function burn(uint amount) external returns (bool) {
        require(tx.origin == server, "ERC20: sender is not server address");
        require(allowance(_msgSender(), server) >= amount, "ERC20: Check the token balance about Collaboration");
        _spendAllowance(_msgSender(), server, amount); // _msgSender => Collaboration contract
        _burn(_msgSender(), amount); // 이후 token burn 진행 -> balance는 자동으로 차감
        require(balanceOf(_msgSender()) == allowance(_msgSender(), server), "ERC20: balance and allowance do not equal after burn for collaboration");

        return true;
    }
    
}