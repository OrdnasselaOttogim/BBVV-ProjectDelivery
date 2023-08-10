// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "./SystemManager.sol";
import "./VaccineRegistry.sol";

/**
 * @title EligibilityChecker
 * @dev Implements vaccine requirements for different entities
 */

contract EligibilityChecker {
    SystemManager public sm; // Declare a vaiable of SystemManager
    VaccineRegistry public vr; // Declare a vaiable of VaccineRegistry

    constructor(address systemManagerAddress, address vaccineRegistryAddress) {
        sm = SystemManager(systemManagerAddress); // Initialize the SystemManager contract instance with the provided address
        vr = VaccineRegistry(vaccineRegistryAddress); // Initialize the VaccineRegistry contract instance with the provided address
    }

    function isEligible(
        uint256 entityIndex,
        VaccineRegistry.Recipient memory recipient
    ) public view returns (bool) {
        require(sm.entityExists(entityIndex),
            "Entity is not in the entity list."
        );
        for (
            uint256 i = 0;
            i < sm.getVaccineRequirementList(entityIndex).length;
            i++
        ) {
            if (
                !vr.isVaccinated(
                    recipient,
                    sm.getVaccineRequirementList(entityIndex)[i]
                )
            ) {
                // if digest of Recipient info + vaccineType is not in recipientVaccineStatus list
                return false;
            }
        }
        return true;
    }
}
