// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Art1stTokenInterface {
    function compensate(address to, uint amount) external returns (bool) {}
    function donate(address from, address to, uint amount) external returns (bool) {}
}

contract Art1stNftInterface {
    function buyNft(address from, address to, uint256 tokenId, uint256 price) external returns (bool) {}
}

contract Batcher is Ownable {
    address art1stTokenAddress; 
    Art1stTokenInterface Art1stTokenContract;

    address art1stNftAddress;
    Art1stNftInterface Art1stNftContract;

    constructor(address erc20addr, address erc721addr) {
        art1stTokenAddress = erc20addr;
        Art1stTokenContract = Art1stTokenInterface(art1stTokenAddress);

        art1stNftAddress = erc721addr;
        Art1stNftContract = Art1stNftInterface(art1stNftAddress);
    }

    function batchTransactions(
        uint[] memory actions, 
        address[] memory froms, 
        address[] memory toes, 
        uint[] memory amounts,
        uint[] memory nfts
    ) public onlyOwner returns (bool){
        // actions: compensate-1, donation-2, buyNft-3
        for (uint i=0; i<actions.length; i++) {
            bool success; 

            if (actions[i] == 1){
                // compensate
                success = Art1stTokenContract.compensate(toes[i], amounts[i]);
            }
            else if (actions[i] == 2) {
                success = Art1stTokenContract.donate(froms[i], toes[i], amounts[i]);
            }
            else if (actions[i] == 3) {
                if(nfts[i] != 0) {
                    success = Art1stNftContract.buyNft(froms[i], toes[i], nfts[i], amounts[i]);
                }
                else{
                    success = false;
                }
            }
            
            if (!success) revert("Batcher: transaction failed");
        }

        return true;
    }
}