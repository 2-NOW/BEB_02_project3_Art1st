const Migrations = artifacts.require("Migrations");
const art1st = artifacts.require("art1st.sol");

// erc20
const Art1stToken = artifacts.require("Art1stToken");
const Batcher = artifacts.require("Batcher");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  // deployer.deploy(art1st);

  // erc20
  //deployer.deploy(Art1stToken);
  deployer.deploy(Batcher, "0x91b3F86eFBE0cFEcE0a7d0d334D826D72cD223b7");
};
