const SystemManager = artifacts.require("SystemManager");
const VaccineRegistry = artifacts.require("VaccineRegistry");
const EligibilityChecker = artifacts.require("EligibilityChecker");

module.exports = function (deployer) {
  deployer.deploy(SystemManager)
    .then(function () {
      return deployer.deploy(VaccineRegistry, SystemManager.address);
    })
    // .then(() => {
    //   deployer.deploy(VaccineRegistry, SystemManager.address);
    // })
    .then(() => {
      return deployer.deploy(EligibilityChecker, SystemManager.address, VaccineRegistry.address);
    });
};