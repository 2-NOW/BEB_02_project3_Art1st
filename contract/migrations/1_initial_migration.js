const Migrations = artifacts.require("Migrations");
const art1st = artifacts.require("art1st.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(art1st);
};
