// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "./SystemManager.sol";

/**
 * @title VaccineRegistry
 * @dev Implements registry of recipient's vaccination
 */
contract VaccineRegistry {
    SystemManager public sm; // Declare a variable of SystemManager

    constructor(address systemManagerAddress) {
        sm = SystemManager(systemManagerAddress); // Initialize the SystemManager contract instance with the provided address
    }

    mapping(bytes32 => bool) public recipientVaccineStatus; // hash(concat(countryCode + id + vaccineType)) -> bool

    struct Recipient {
        string id;
        string countryCode;
    }

    modifier OnlyAuthorized() {
        require(
            sm.authorizedUserList(msg.sender),
            "Only authorized users are allowed."
        );
        _;
    }

    event VaccineAddedToRecipient(bytes32 vaccineInfoDigest);


    function viewAuthorizedUsers(address ad) public view returns (bool) {
        return sm.authorizedUserList(ad);
    }

    // example input ["1", "IT"], "V2"
    function addVaccineToRecipient(
        Recipient memory recipient,
        string calldata vaccineCode
    ) public OnlyAuthorized {
        require(sm.vaccineList(vaccineCode), "Vaccine code is not in list");
        recipientVaccineStatus[
            hashRecipientVaccineInfo(recipient, vaccineCode)
        ] = true;
        emit VaccineAddedToRecipient(
            hashRecipientVaccineInfo(recipient, vaccineCode)
        );
    }

    function isVaccinated(Recipient memory recipient, string memory vaccineCode)
        public
        view
        returns (bool)
    {
        return (
            recipientVaccineStatus[
                hashRecipientVaccineInfo(recipient, vaccineCode)
            ]
        );
    }

    function hashRecipientVaccineInfo(
        Recipient memory recipient,
        string memory vaccineCode
    ) private pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    string(bytes.concat(bytes(recipient.countryCode), bytes(recipient.id), bytes(vaccineCode)))
                    // string.concat(
                    //     recipient.countryCode,
                    //     recipient.id,
                    //     vaccineCode
                    // )
                )
            );
    }
}
