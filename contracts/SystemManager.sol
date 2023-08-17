// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title SystemManager
 * @dev Handles the distribution of authority to users and adding a record of vaccine codes
 */

contract SystemManager {
    address public admin;
    uint256 public entityCount;
    mapping(address => bool) public authorizedUserList; //user address -> bool
    mapping(string => bool) public vaccineList; //vaccineCode -> bool
    mapping(address => Entity) public addressToEntity; //address -> Entity
    mapping(uint256 => address) public entityList;
    struct Entity {
        address entityAddress;
        string entityName;
        string[] vaccineRequirementList;
    }

    modifier OnlyAdmin() {
        require(msg.sender == admin, "Only admin is allowed");
        _;
    }

    constructor() {
        admin = msg.sender; // contract deployer becomes the admin 1. add authorized users to system, 2. add entities to system, 3. add vaccine codes to system
    }

    event VaccineAdded(string vaccineCode);

    event AuthorizedUserAdded(address userAddress);

    event EntityAdded(address entityAddress, string entityName);

    event RequirementAdded(address entityAddress, string vaccineCode);

    function addEntity(address entityAddress, string memory entityName)
        public
        OnlyAdmin
    {
        require(
            addressToEntity[entityAddress].entityAddress != entityAddress,
            "An entity with this address already exists"
        );
        require(
            bytes(entityName).length != 0,
            "Entity name cannot be empty"
        );
        addressToEntity[entityAddress] = Entity(
            entityAddress,
            entityName,
            new string[](0)
        );
        entityList[entityCount] = entityAddress;
        entityCount++;
        emit EntityAdded(entityAddress, entityName);
    }

    function addAuthorizedUser(address userAddress) public OnlyAdmin {
        require(
            !authorizedUserList[userAddress],
            "A user with this address already exists"
        );
        authorizedUserList[userAddress] = true;
        emit AuthorizedUserAdded(userAddress);
    }

    function addVaccineToSystem(string calldata vaccineCode) public OnlyAdmin {
        require(
            !vaccineList[vaccineCode],
            "A vaccine with this code already exists"
        );
        vaccineList[vaccineCode] = true;
        emit VaccineAdded(vaccineCode);
    }

    function addRequirement(uint256 entityIndex, string memory vaccineCode)
        public OnlyAdmin
    {
        require(vaccineList[vaccineCode], "The vaccine code is not in the list of existing vaccines");
        require(
            bytes(addressToEntity[entityList[entityIndex]].entityName).length != 0,
            "Entity is not in the entity list"
        );

        addressToEntity[entityList[entityIndex]].vaccineRequirementList.push(vaccineCode);
        emit RequirementAdded(entityList[entityIndex], vaccineCode);
    }

    function getVaccineRequirementList(uint256 entityIndex) external view returns (string[] memory) {
        return addressToEntity[entityList[entityIndex]].vaccineRequirementList;
    }

    function entityExists(uint256 entityIndex) external view returns(bool){
        return bytes(addressToEntity[entityList[entityIndex]].entityName).length != 0 ? true : false;
        
    }
}
