
# Medichain

Medichain is a blockchain-based project aimed at revolutionizing the way medical records are stored, accessed, and managed securely.


Medichain is a cutting-edge solution in the healthcare sector—a blockchain-based Electronic Health Record System (E-HRs). Leveraging the transparency and tamper-proof nature of blockchain technology, this system offers several significant advantages. It ensures full transparency in health records, preventing unauthorized alterations and facilitating seamless data transfer between hospitals. Patients benefit from easy access to their medical history, eliminating the need to carry physical files. Moreover, the system streamlines insurance claim processes, making it efficient for insurance companies to approve or deny claims. The architecture of the project employs Ganache for local blockchain setup, Truffle Framework for contract deployment, React and Node for the front end, and Metamask for user authentication via public keys. This innovative system stands to revolutionize the healthcare industry by enhancing data security, accessibility, and interoperability.

Furthermore, this project's architecture is designed with a focus on user-friendly interaction and robust security. Utilizing Ganache and Truffle Framework for the blockchain environment and contract deployment ensures a stable and reliable foundation. The front end, built with React and Node, offers an intuitive interface for patients, doctors, healthcare providers, and insurance companies. The integration of the Web3.js package facilitates seamless interaction with the Solidity contracts, while Metamask's public key authentication enhances user privacy and access control. With this blockchain-based E-HRs system, healthcare stakeholders can confidently embrace digitization, knowing that patient data remains unalterable, easily accessible, and efficiently managed, ultimately paving the way for a more efficient and secure healthcare ecosystem.


## Features

- **Secure Storage**: Encrypt and store medical records on the blockchain.
- **Access Control**: Fine-grained access control for patients, doctors, and institutions.
- **Interoperability**: Easy integration with existing healthcare systems.
- **Transparency**: Full transparency in health records, preventing unauthorized alterations.
- **Seamless Data Transfer**: Facilitates seamless data transfer between hospitals and healthcare providers.
- **User-Friendly Interface**: Intuitive interface for patients, doctors, healthcare providers, and insurance companies.
- **Streamlined Insurance Claims**: Efficient process for insurance companies to approve or deny claims.
- **Robust Security**: Enhanced data security, accessibility, and interoperability.
- **Metamask Integration**: User authentication via public keys with Metamask.
- **Blockchain Setup**: Uses Ganache for local blockchain setup and Truffle Framework for contract deployment.


## Installation

To set up the project locally, follow these steps:

### Prerequisites

- **Code Repository from GitHub**
- **Visual Studio Code**
- **Ganache**
- **Node v11.2.0 or above**
- **NPM v5.1.6 or above**
- **Firefox or Chrome**
- **Metamask Account**

### Steps

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/Highcryp17/Medichain.git
   ```
2. **Navigate to the Project Directory:**
   ```sh
   cd Medichain
   ```
3. **Install Truffle Framework:**
   ```sh
   npm install -g truffle
   ```
4. **Install Project Dependencies:**
   ```sh
   npm install
   cd client 
   npm install
   cd ../
   ```
5. **Configure Ganache:**
   - Open Ganache and create a new workspace.
   - Import the `truffle-config.js` file into Ganache.
   - Verify that all configurations and wallets are imported successfully.
6. **Migrate and Deploy Smart Contracts:**
   ```sh
   cd contracts
   truffle migrate
   cd ../
   ```
   - Ensure that the contracts are successfully deployed and ready to use.

7. **Link Contract Address to WebPage:**
   - Go to `./client/src/`.
   - Open the file named `getContract.js`.
   - Scroll down to the very end of the file.
   - Replace the value of `var address = "0x0000000000000000000000000000000000000000";` with the contract address you get from Ganache after your contracts are deployed.
     - In Ganache: Go to `Contracts` -> `Users` -> `Address` and copy this address.
   - Paste this address in `getContract.js`.
   - Save and close the file.

8. **Create and Configure Local Network:**
   - Login to your Metamask wallet.
   - Go to Settings -> Advanced -> turn "Show test network" to ON.
   - Go to Settings -> Networks -> "Add a Network".
   - Scroll down and click "Add a network manually".
     - **Network Name**: Medichain
     - **New RPC URL**: http://127.0.0.1:7545
     - **Chain ID**: 1337
     - **Currency Symbol**: ETH
   - Click "SAVE".

9. **Import Your Account:**
   - Switch to the Medichain network.
   - Click on "Account 1" and you will see options for "Add Account" and "Hardware wallet" -> "Import Account".
   - Go to Ganache, click the key symbol of any account, and copy the private key.
   - Paste it into Metamask and rename it to Healthcare.

10. **Configure Healthcare Login:**
   - Copy the public address of the healthcare account.
   - Go to `/client/src/views/Healthcarelogin.js`.
   - Look for `0x0000000000000000000000000000000000000000` and replace it with the copied address.
   - Save and close the file.

11. **Import Multiple Accounts:**
   - Repeat step 9 again at least 2 times for a "Patient" and "Doctor" account.

12. **Run the Project:**
   ```sh
   cd client
   npm start
   ```

13. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact Kalp Shah at [your.email@example.com].
