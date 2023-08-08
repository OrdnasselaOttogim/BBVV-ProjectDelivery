const VaccineRegistry = artifacts.require("VaccineRegistry");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("VaccineRegistry", function (/* accounts */) {
  it("should assert true", async function () {
    await VaccineRegistry.deployed();
    return assert.isTrue(true);
  });
});
