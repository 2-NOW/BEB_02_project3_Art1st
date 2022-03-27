// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Art1stTokenInterface {
    function compensate(address to, uint amount) external returns (bool) {}
    function donate(address from, address to, uint amount) external returns (bool) {}

}

contract Batcher is Ownable {
    address art1stTokenAddress; 
    Art1stTokenInterface Art1stTokenContract;

    constructor(address erc20addr) {
        art1stTokenAddress = erc20addr;
        Art1stTokenContract = Art1stTokenInterface(art1stTokenAddress);
    }

    function batchTransactions(uint[] memory actions, address[] memory froms, address[] memory toes, uint[] memory amounts) public onlyOwner returns (bool){
        // actions: compensate인지, donation인지 -> compensate: 1, donation: 2
        for (uint i=0; i<actions.length; i++) {
            bool success; 

            if (actions[i] == 1){
                // compensate
                success = Art1stTokenContract.compensate(toes[i], amounts[i]);
            }
            else if (actions[i] == 2) {
                success = Art1stTokenContract.donate(froms[i], toes[i], amounts[i]);
            }

            if (!success) revert('transaction failed');
        }

        return true;
    }
}