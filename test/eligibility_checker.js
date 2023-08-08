const EligibilityChecker = artifacts.require("EligibilityChecker");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("EligibilityChecker", function (/* accounts */) {
  it("should assert true", async function () {
    await EligibilityChecker.deployed();
    return assert.isTrue(true);
  });
});
