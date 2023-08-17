# **Blockchain Based Vaccine Verification System**

![logo](https://github.com/OrdnasselaOttogim/BlockchainProject/assets/71702362/7ceb69a8-5a68-4cad-88b6-04639177c26e)


# **_Abstract and introduction_**

In our ever-evolving world where health crisis and concerns about data privacy have been increasing, there is a need for an efficient, secure system to verify individuals’ vaccination records. Current vaccine record verification systems are often cumbersome, require the sharing of personal data, and lack the integrity of the data. Furthermore, vaccine record storage varies between countries and even among different health centers. In some cases, keeping records is the responsibility of individuals, potentially leading to record loss. \
To better understand this concept we can use a simpler real-world scenario, for example, the Covid pandemic period in Italy. During that period, in order to access public places such as bars or hospitals, a “Green Pass” was required. This special pass was granted to people only after taking the appropriate number of Covid vaccines mandated by the Government. Once you had shown this pass to the relevant authority and scanned your QR code, they would access your personal data and cross-check with your identity card to see if you were really who you claimed to be. Additionally, all this data was stored somewhere, typically in a database. However, you as an individual, had limited knowledge and control over how this data is stored and processed and there was no guarantee of protection against potential data breaches. \
This project addresses these issues by leveraging blockchain’s capabilities to develop a solution that securely stores the data and accurately verifies vaccination records without evidently keeping information about them and therefore enforcing their privacy against public and private entities entitled to check such eligibility in order to provide access to their structures. \
The system we developed provides a user-friendly interface with which it is possible for everyone to demonstrate if they have a particular vaccine, as well as their eligibility to access places and their vaccination history to doctors anytime and everywhere, without the need of carrying extra documentation. Moreover, adding vaccines to the system bound to a specific user is totally secure and can be performed and monitored only by competent authorities, such as doctors or similar. The blockchain model ensures transparency and privacy and availability of the data. \
The Blockchain-Based Vaccine Verification System (BBVV) is an innovative way to utilize blockchain technology through a decentralized application to address the challenges associated with vaccine verification and record-keeping. This comprehensive report provides an in-depth analysis of the DApp's objectives, technology stack, system architecture, and key features. \
Amidst the global significance of vaccination in public health, the need for secure, tamper-proof, and easily accessible vaccination records has become paramount. The DApp aims to revolutionize vaccine verification by leveraging blockchain technology and providing a user-friendly interface for individuals, healthcare providers, and government agencies. \
The primary objectives of the DApp are to create a secure and immutable repository of vaccination records, enable easy verification and access to vaccination status, and facilitate seamless communication between stakeholders in the healthcare ecosystem.


## **_Technology stack & background_**

Blockchain technology has garnered significant attention for its potential to revolutionize various industries beyond finance. The key features that make blockchain attractive for applications like the Vaccine Verification System are its decentralized nature, immutability, and transparency. \
A blockchain is a distributed and decentralized ledger that records all transactions in a secure and immutable manner. Each transaction, also known as a block, is cryptographically linked to the previous one, forming a chain of blocks. This ensures that any attempt to alter data in a block would require modifying all subsequent blocks, making it practically impossible to tamper with the data without detection. \
The concept of vaccine verification systems is not entirely new, as numerous initiatives and projects have attempted to create centralized databases for vaccine records. However, these systems often face challenges related to data privacy, security breaches, and interoperability. The inherent transparency and security of blockchain technology offer a promising solution to these issues. \
The development of the BBVV System relies on two essential components: Solidity for the backend smart contract development and React for the frontend user interface.


# **_System Architecture_**

This application adopts a distributed and decentralized system architecture to ensure robustness and resilience. The architecture, besides frontend and backend, obviously relies on the Ethereum blockchain.


## **Frontend**

The frontend of the DApp is developed using React, a popular JavaScript library for building user interfaces. React's component-based architecture and virtual DOM allow developers to create interactive and responsive user interfaces efficiently. The user interface is designed to be visually appealing, intuitive, but most importantly easy to use. \
The frontend component is the user-facing part of the DApp, where users interact with the system through a web-based interface. It enables users to perform various actions, such as verifying vaccination status or checking the eligibility for accessing certain places. The frontend communicates with the blockchain through the deployed smart contracts by executing them to access data stored on the blockchain.


## **Backend**

The backend comprises three essential smart contracts developed in Solidity: System Manager, Vaccine Registry, and Eligibility Checker. These smart contracts define the rules and logic of the DApp. The System Manager contract is the core one, from which the others depend, and it manages the administrative operations; the Vaccine Registry contract stores and manages vaccination records; the Eligibility Checker contract verifies eligibility criteria for gaining access to specific entities with a certain set of vaccines. These smart contracts were developed and tested using Remix IDE. After verifying the accuracy of the functions used in the smart contracts through Remix IDE, the developed smart contract was tested on the Ethereum blockchain simulation environment Ganache provided by Truffle. 



### **Smart Contracts**

The DApp implements three crucial smart contracts to manage various functionalities:



* **System Manager:** The System Manager contract is designed to manage the distribution of authority and vaccine records on the blockchain. Its main functionalities are vaccine code registration, entity registration, and user authorization. The contract has several components and functionalities: 
    * _constructor_: The constructor initializes the admin variable with the address of the deployer.
    * _admin_: The address of the contract deployer that can perform several actions that only the admin is entitled to.
    * _Entity_: A struct that contains:
        * _entityAddress_: Ethereum address of the entity.
        * _entityName_: String type name of the entity.
        * _vaccineRequirementList_: An array of strings representing vaccine codes required by the entity.
    * _OnlyAdmin()_: A custom modifier that allows certain functions to be executed only by the admin. If the sender has a different address than the admin's, the modifier throws an error.
    * _authorizedUserList_: A mapping that associates addresses with a boolean value indicating whether the addresses are authorized users.
    * _vaccineList_: A mapping that links the string type vaccine codes to boolean values.
    * _addressToEntity_: A mapping that associates addresses with an _Entity _struct.
    * _entityList_: A mapping that associates the entity indices with uint256 type to their corresponding entity addresses.
    * _Events_: The contract emits several events to notify external systems about changes.
        * _EntityAdded_: Emitted when a new entity is registered.
        * _AuthorizedUserAdded_: Emitted when an authorized user is added to the system.
        * _VaccineAdded_: Emitted when a new vaccine code is added to the system.
        * _RequirementAdded_: Emitted when a new vaccine requirement is associated with an entity.
    * Functions:
        * _addEntity_: Allows the admin to register new entities to the system by providing an address and a name.
        * _addAuthorizedUser_: Allows the admin to authorize users by adding their addresses.
        * _addVaccineToSystem_: Allows the admin to add new vaccine codes to the system.
        * _addRequirement_: Allows the admin to add vaccine requirements to entities.
        * _getVaccineRequirementList_: An external view type function that retrieves the list of required vaccines for a specific entity.
        * _entityExists_: An external view type function that checks if an entity exists based on its entity.
* **Vaccine Registry:** The Vaccine Registry is responsible for storing vaccination to keep track of recipients’ vaccine records. The contract interacts with the SystemManager contract to ensure authorized access and validation of vaccine codes. The contract has several components and functionalities:
    * _sm_: A public variable that holds an instance of the _SystemManager _contract.
    * _constructor_: The constructor initializes variable sm with a provided deployed SystemManager contract address.
    * _recipientVaccineStatus_: A mapping that associates a hash of the recipient's information and vaccine code with a boolean value, indicating vaccination status.
    * _Recipient_: A struct that contains:
        * _id_: String type identifier of the user.
        * _countryCode_: String type code of the country of the user.
    * _OnlyAuthorized()_: A modifier that ensures only authorized users, as determined by the _SystemManager _contract, can use certain functions.
    * Events:
        * _vaccineAddedToRecipient_: Emitted when a hashed vaccine information is added to the system.
    * Functions:
        * _addVaccineToRecipient_: Allows authorized users to add hashed vaccine record information to the system.
        * _hashRecipientVaccineInfo_: A private function that computes and returns the hash of the recipient and the vaccine information.
        * _viewAuthorizedUsers_: A function to check whether an address is authorized by the sm or not.
        * _isVaccinated_: A function to check whether a recipient is vaccinated for a specific vaccine code.
* **Eligibility Checker:** The Eligibility Checker contract is designed to determine the eligibility of a recipient for different entities based on their vaccine requirements and the vaccine of the recipients. It ensures that only eligible individuals can access certain entities. The contract has several components and functionalities:
    * _sm_: A public variable that holds an instance of the SystemManager contract.
    * _vr_: A public variable that holds an instance of the VaccineRegistry contract.
    * _constructor_: The constructor initializes variables sm and vr with the deployed contract addresses of SystemManager and VaccineRegistry.
    * Functions:
        * _isEligible_: Determines whether a recipient is eligible for accessing an entity according to the requirements of an entity and the vaccination of the recipient. It takes _entityIndex_ and _Recipient _struct as inputs and returns a boolean value indicating eligibility. It iterates through the vaccine requirement list of the specified entity, checking if the recipient is vaccinated for each required vaccine using the _isVaccinated _function in _VaccineRegistry _contract.à
### **Ethereum Blockchain**

The Ethereum blockchain serves as the decentralized ledger that stores all vaccination records in a tamper-proof and immutable manner. Each vaccine transaction is recorded as a block on the blockchain, forming an unbroken chain of data. The decentralized nature of the blockchain ensures that no single entity has control over the data, mitigating the risk of data manipulation or unauthorized access.



### **Types of account**

In this system there will be 4 types of accounts (excluding smart contracts) with different roles and capabilities: 



* **System Administrator:** in charge of granting the status of “Authorized User” to any node of the blockchain. Moreover they can add new vaccines and entities to the system, and create the list of vaccines required for each entity. In a real world scenario this account should be impersonated by the central statal authority, for example Ministry of Health, in charge of choosing the recognized vaccines and delegating subordinated authorities.  \
Only one node can be admin, and this happens when the blockchain is initialized for the first time and the smart contracts deployed. Afterwards, any of the previously stated operations are therefore safeguarded from unauthorized executions.
* **Authorized User:** this account has the faculty of checking if a user has the vaccine that they claim to have, by inserting a combination of vaccine code and unique user identifier. This account can be granted, for example, to doctors or to whomever should be in charge of checking the eligibility of a citizen to enter public structures. 
* **Entities:** an entity can be any of the public or private facilities for which a citizen is required to have any set of mandatory vaccines in order to access. Those entities can be for example schools, hospitals, public places, institutional offices, etc. Each entity comes with a modifiable set of required vaccines in order to access. 
* **Normal users:** i.e. the common citizen on whom the verification procedure happens. There can be two different approaches to identify them: one (currently used) is to leave the legislative statal authority to assign to each user a unique identifier (e.g. the identity card number or similar) and communicate it through official channels (in this case therefore a normal user is NOT a node of the blockchain). This approach is more simple and scalable than the second and also easier for final users, who just need to hold their unique code. The second approach is much harder to realize but leads to a more ordered and scalable system, that allows each user to be a node of the Ethereum blockchain and therefore possess an address to uniquely identify them. 
* **Smart contracts:** refer to the “Smart Contracts" section.


## **_Features of the DApp_**

The BBVV System encompasses a comprehensive set of features designed to address the specific needs of various stakeholders. These features include:



* **No need for user registration:**

The DApp allows users to utilize the system without the need of registering or creating an account. All they need to do is just to keep their public key (or alternatively a wallet like Metamask) and communicate it when necessary.



* **Vaccine Verification and Issuance:**

Users can verify their vaccination status only by submitting their PK as just stated. Any other personal data are not required. Healthcare providers and authorized entities can issue digital vaccination certificates on the blockchain.



* **Data Privacy and Security:**

The DApp employs encryption and private key management techniques to safeguard user data and maintain data privacy. Access to vaccination records is strictly controlled, ensuring only authorized users can view and update the data.



* **Transaction History:**

Any node in the network can see and verify any transaction, making the system transparent. The transaction history is transparent and verifiable, providing authorities with a comprehensive overview of the requestor’s vaccination history.



* **User Interface:**

The user interface of the DApp is intuitive, visually appealing, and user-friendly. It features easy navigation and seamless interactions, enhancing the overall user experience.


## **_Implementation & Development Details_**

The successful implementation of the BBVV System involves meticulous planning, development, testing, and deployment. The development process follows an agile methodology, enabling iterative improvements and continuous feedback incorporation. As for the workload of the project, we assure that it has been splitted evenly between the participants, as also most of the project has been made while physically in presence together. 



* **Smart Contract Development (Solidity):**

The smart contract development process begins with defining the data structures and functions required for vaccine verification and issuance. It includes mechanisms for data validation, access control, and event logging. The smart contracts are thoroughly tested to ensure security and efficiency.



* **Frontend Development (React):**

Frontend development involves creating the user interface and designing interactive components. The user interface is designed to be responsive, visually appealing, and user-friendly. React components are used to manage the state and facilitate dynamic updates while the Bootstrap framework provides a more visually appealing interface.



* **Integration of Backend and Frontend:**

Web3.js serves as the crucial bridge enabling the integration of the backend (smart contracts) and frontend in our dApp. This library facilitates direct interaction between the user interface and the blockchain's decentralized operations, streamlining data retrieval and transaction processing. Through Web3.js, a cohesive synergy is achieved, embodying the seamless integration of user experience with the power of smart contract functionality.



* **Testing and Quality Assurance Procedures:**

Comprehensive testing procedures, including unit testing on every single smart contracts' functions, have been conducted to identify and resolve any potential issues or bugs. Quality assurance measures ensure the DApp meets the desired performance, security, and usability standards.


# **_User Guide & Instructions_**

The preferred method for users to access the application interface is through the Metamask program. This program operates as a browser extension, enabling users to log into the application by linking their Ethereum wallets and private keys with Metamask. Within the application, Metamask carries out user verification using digital signatures. Each transaction is confirmed via Metamask, as users load their Ethereum wallets onto Metamask with their private keys. These private keys are used to sign transactions, ensuring user identity verification. \
The smart contract is developed using Truffle and then incorporated into the Ganache blockchain platform. Upon loading the smart contract, the constructor section within the contract is executed. This step defines the admin user, who introduces user privileges to the blockchain network on a one-time basis for application usage. The necessary attributes for the admin user to gain access to the application are specified within the constructor segment. \
The user guide provides step-by-step instructions on how to use the BBVV System effectively. It covers every aspect of the DApp, from registration to vaccine verification. Note that the content of the frontend page is dynamic, and changes according to which account is currently logged in the Metamask wallet. In the following, a list of all the action that can be performed by every type of account:



* **Actions that can be performed only by system administrator:**

    In order to perform these kinds of actions, you need to be logged in in your Metamask wallet with administrator privileges, i.e. with the account that deployed first the contracts to the blockchain. These actions include:

    * _Registration of vaccine (adding a new vaccine to the system):_

    Scroll down until the “Add Vaccine” section and then insert the vaccine code. The standardization of vaccine code names is nothing of our concern, but it would be decided and agreed by the state authority.


<img width="1302" alt="add vaccine" src="https://github.com/OrdnasselaOttogim/BlockchainProject/assets/71702362/03d17596-34b9-4b6e-ac3a-f1c238c96ecb">



   * _Granting an account superior privileges:_
  
Administrator can decide to make an account become an _authorized user_: scroll down to the “Add authorized user” section and enter the public address of the account; finally, press “Add”.

<img width="1302" alt="add authorized user" src="https://github.com/OrdnasselaOttogim/BlockchainProject/assets/71702362/cc1aa69e-de3a-46dc-a193-a7ed8f4da910">



The administrator can also decide to make an account an _entity_. In order to perform this action, scroll to the “Add entity” section; put the public address of the desired account and select a name to best represent that entity. As for vaccine names, the standardization of entities’ names is alike a government concern.

<img width="1303" alt="add entity" src="https://github.com/OrdnasselaOttogim/BlockchainProject/assets/71702362/f65b8f39-c811-485e-a257-8675aa15d380">




   * _Adding a requirement to an entity:_

  
Scroll down to the “Add requirement” section; then, select the desired entity from the dropdown menu; a list of all existing entities will be shown; finally, add the vaccine code to add to that entity’s constraints and press the “Add” button. Note that if you wrote a non existing vaccine code, the system correctly wouldn’t allow it, notifying the error back to the user.

<img width="1302" alt="add requirement" src="https://github.com/OrdnasselaOttogim/BlockchainProject/assets/71702362/7cb26f9c-ca2d-4121-b9a1-c9dcb3ad268b">



* **Actions that can be performed only by authorized users:**


  
In order to perform these kinds of actions, you need to be logged in in your Metamask wallet with authorized user privileges, i.e. with the account that has granted super privileges by the system administrator. In this case the possible action is only one, and it is:

   * _Giving a vaccine to a recipient:_


After logging in as authorized user, locate the "Register vaccine" card. Then, insert the unique user identifier (following the adopted standard) and subsequently the country code (e.g. "IT", "EN", "DE", etc...) and the vaccine code. The vaccine code must be one approved by the central authority, i.e. it has to be some from the set the admin had created. If the vaccine code does not exist, the vaccination registration won't be allowed.

<img width="1303" alt="give vaccine" src="https://github.com/OrdnasselaOttogim/BlockchainProject/assets/71702362/870783f1-6ff9-4c8a-907f-a93c005186c2">


# **_Business Model Canvas_**

We now outline the various components that constitute the business model of this system. Each component is analyzed in the following list:

### **Customer Segments**

The BBVV System caters to various customer segments, each with distinct needs and requirements:

- Individual Users: These are everyday citizens seeking a secure and convenient method to verify and access their vaccination records. The DApp provides them with a user-friendly interface to check their vaccination status, receive digital certificates, and manage their vaccine history.
- Healthcare Providers: Doctors, nurses, and medical professionals play a critical role in administering vaccines and maintaining accurate vaccination records. The DApp allows healthcare providers to update vaccination data on the blockchain securely, issue digital certificates to patients, and access vaccination histories for medical purposes.
- Government Agencies: Government entities, such as the Ministry of Health, are key stakeholders in the vaccine verification process. The DApp can be utilized by these agencies to ensure the validity and authenticity of vaccination records for citizens, especially in scenarios like international travel or access to public facilities.
    
### **Value Propositions**

The BBVV System offers several compelling value propositions to its users:

- Enhanced Data Security: By leveraging blockchain technology, the DApp ensures that vaccination records are securely stored and tamper-proof. Users have control over their data, and only authorized entities can access the information, reducing the risk of data breaches.
- Trust and Transparency: The decentralized nature of the blockchain instills trust among users and stakeholders. Each vaccination transaction is recorded transparently on the blockchain, making it verifiable and immutable.
- Convenient Access: The DApp provides a user-friendly interface for individuals and healthcare providers to access vaccination records. Users can easily verify their vaccination status and obtain digital certificates without the need for physical documentation.
- Seamless Integration: The DApp can be integrated with existing healthcare systems and government databases, ensuring interoperability and smooth adoption for healthcare providers and government agencies.
    
### **Channels**

The distribution and marketing of the BBVV System will utilize various channels:

- Online Platforms: The DApp will be made available on popular online platforms such as app stores and official websites. This ensures easy accessibility for individual users who can download the app on their smartphones or computers.
- Healthcare Institutions: Collaborating with healthcare institutions will allow the DApp to be adopted within medical facilities. Doctors and nurses can directly issue digital certificates to patients using the DApp, creating a seamless user experience.
- Government Partnerships: Establishing partnerships with government agencies responsible for healthcare and vaccination programs will facilitate the adoption of the DApp at a national level. Such partnerships can lead to official endorsements and mandates for vaccine verification using the DApp.
    
### **Customer Relationship**

Building and maintaining strong customer relationships are crucial for the success of the BBVV System:

- User Support: The DApp will offer comprehensive user support, addressing user queries and concerns promptly. A dedicated customer support team will be available to assist users with technical issues and provide guidance.
- Feedback Mechanism: The DApp will include a feedback mechanism to gather user feedback and suggestions for improvement. This valuable input will be used to enhance the DApp's functionalities and user experience.
- Regular Updates: The development team will ensure regular updates and improvements to the DApp to address emerging needs and challenges.
    
### **Revenue Stream**

The BBVV System can generate revenue through various streams:

- Government funding: In the hypothetical scenario in which the BBVV is selected as official country vaccine verification method, generate revenue through public funds and taxes allocated for the development and maintenance of the application.
- Transaction fees: Charge businesses and venues a nominal fee for each verification transaction, covering operational costs.
    
### **Key Resources**

The successful operation of the BBVV System relies on essential resources:
- Blockchain Infrastructure: Access to the Ethereum blockchain network or other compatible blockchains is essential for storing and managing vaccination records.
- Technology Expertise: Skilled developers and blockchain experts are crucial for the development and maintenance of the DApp.
- Secure Data Storage: Robust and secure data storage solutions are necessary to protect user data and vaccination records.
    
### **Key Activities**

The key activities involved in operating the BBVV System include:
- Smart Contract Development: Continuously updating and maintaining the smart contracts to ensure accuracy, security, and functionality.
- User Interface Updates: Regularly improving the user interface to enhance user experience and accessibility.
- Integration and Collaboration: Collaborating with healthcare providers, government agencies, and other stakeholders for seamless integration and adoption of the DApp.

### **Key Partners**

Strategic partnerships are vital for the success of the BBVV System:
- Healthcare Providers: Partnering with healthcare institutions and clinics will facilitate the adoption of the DApp within the healthcare ecosystem.
- Government Authorities: Collaboration with government agencies responsible for vaccination programs will lead to official endorsements and widespread adoption.

### **Cost Structure**

The cost structure of the Blockchain-Based Vaccine Verification System includes various components:
- Development and Maintenance: Expenses related to smart contract development, frontend updates, and ongoing maintenance of the DApp.
- Blockchain Transactions: Costs associated with blockchain transactions and gas fees.
- Marketing and Promotion: Investment in marketing and promotional campaigns to increase awareness and adoption of the DApp at national level.


## **_Conclusion_**

The Blockchain-Based Vaccine Verification System presents a groundbreaking solution to the challenges of vaccine verification. With its secure and transparent approach, the DApp offers immense potential to revolutionize vaccine record-keeping and accessibility while ensuring data privacy and security. By aligning its business model with the needs of various stakeholders, the DApp is poised to make a significant impact on the national healthcare landscape.
