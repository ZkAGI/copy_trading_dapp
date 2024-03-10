import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { deployContract } from './Deploycontract';
import Dep from './Dep';


function Copy() {
  const [followerAddress, setFollowerAddress] = useState('');
  const [masterAddress, setMasterAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [slaveAddress, setSlaveAddress] = useState('');
  const [contractAddress, setContractAddress] = useState(''); 
  const [tcontractAddress, setTcontractAddress] = useState(''); 
  const [contract, setContract] = useState(null);
  const [tcontract, setTcontract] = useState(null);
  const [latestTransactionHash, setlatestTransactionHash] = useState('');

  const registeryAddress = "0x13ef4F8b0B171446DEe9CB1983e56d9B85064B87";
  const registeryABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"name": "registerContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_contractAddress",
				"type": "address"
			}
		],
		"name": "registerTContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getTContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "TuserToContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userToContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
  const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dex",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "follower",
				"type": "address"
			}
		],
		"name": "FollowerAddedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "follower",
				"type": "address"
			}
		],
		"name": "FollowerRemovedEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "follower",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "OrderCreatedEvent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_followerAddress",
				"type": "address"
			}
		],
		"name": "addFollower",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "dex",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "followers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_followerAddress",
				"type": "address"
			}
		],
		"name": "isInFollowers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "master",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxNrOfFollowers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nrOfFollowers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "order",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_followerAddress",
				"type": "address"
			}
		],
		"name": "removeFollower",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
  ];
  const transactionABI=[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_transactionHash",
				"type": "string"
			}
		],
		"name": "postTransactionHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "master",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "transactionHash",
				"type": "string"
			}
		],
		"name": "TransactionPosted",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLatestTransactionHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "master",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "masterTransactionHashes",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
  ];
  const web3 = new Web3(Web3.givenProvider || 'https://rpc2.sepolia.org/');
  const registeryContract = new web3.eth.Contract(registeryABI, registeryAddress);

  const handleDeployContract = async () => {
    try {
      console.log('Deploying contract...');
      const contractAddress = await deployContract(web3.eth.defaultAccount);
    } catch (error) {
      console.error('Error deploying contract:', error);
    }
   };

  const connectWallet = async () => {
	try {
	  if (window.ethereum) {
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		setIsConnected(true);
		setWalletAddress(accounts[0]); 
		web3.eth.defaultAccount = accounts[0]; 
		setSlaveAddress(accounts[0]);
	  } else {
		console.error('MetaMask is not installed');
	  }
	} catch (error) {
	  console.error('Error connecting to wallet:', error);
	}
   };

  async function getContractAddress(){
	try {
        const contractAddress = await registeryContract.methods.getContractAddress(masterAddress).call();
		
		if (contractAddress!=undefined && contractAddress!=null){
			setContractAddress(contractAddress);
		}
		const tContractAddress = await registeryContract.methods.getTContractAddress(masterAddress).call();
		if (tContractAddress!=undefined && tContractAddress!=null){
			setTcontractAddress(tContractAddress);
		}
        console.log("Contract Address for User:", contractAddress);
		console.log("TContract Address for User:", tcontractAddress);
		if(contractAddress!=undefined && contractAddress!=null && tcontractAddress!=undefined && tcontractAddress!=null){
		const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
		const tcontractInstance = new web3.eth.Contract(transactionABI, tcontractAddress);
        setContract(contractInstance);
		setTcontract(tcontractInstance);
		};
    } catch (error) {
        console.error("Error getting contract address:", error);
    }
   };
   

  async function settContractAddress(){
	try {
		const caPromise = new Promise((resolve, reject) => {
            const ca = sessionStorage.getItem("contractAddress");
            if (ca !== null) {
                resolve(ca);
            } else {
                reject(new Error('Contract address not found in sessionStorage.'));
            }
        });
        const ca = await caPromise;
        console.log(ca);
		const taPromise = new Promise((resolve, reject) => {
            const ta = sessionStorage.getItem("TransactionAddress");
            if (ta !== null) {
                resolve(ta);
            } else {
                reject(new Error('Contract address not found in sessionStorage.'));
            }
        });
        const ta = await taPromise;
        console.log(ta);
		if (window.ethereum) {
			
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			if (accounts.length === 0) {
				throw new Error('No accounts found. Please check your MetaMask setup.');
			};
		
			const transactionParameters = {
				from: accounts[0],
				to: registeryAddress,
				data: registeryContract.methods.registerContract(ca).encodeABI(),
				gasPrice: '4000000000', 
			};
			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters],
			})
			console.log("C address added to sc")
			const txParameters = {
				from: accounts[0],
				to: registeryAddress,
				data: registeryContract.methods.registerTContract(ta).encodeABI(),
				gasPrice: '4000000000', 
			};
			const transactionHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [txParameters],
			})
			console.log("TransactionC address added to sc")
			;}
    } catch (error) {
        console.error("Error getting contract address:", error);
    }
   };

//   const addFollower = async () => {
//     try {
//         await window.ethereum.enable();
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

//         if (accounts.length === 0) {
//             throw new Error('No accounts found. Please check your MetaMask setup.');
//         }
// 		if (contract==null || contract==undefined) {
//             throw new Error('Contract instance not available.');
//         }
//         const transactionParameters = {
//             from: accounts[0],
//             to: contractAddress,
//             data: contract.methods.addFollower(followerAddress).encodeABI(),
//             gasPrice: '4000000000', 
//         };

//         console.log('Follower added successfully');
// 		console.log('Sending transaction...');
//         const txHash = await window.ethereum.request({
//             method: 'eth_sendTransaction',
//             params: [transactionParameters],
//         });
		
//         console.log('Transaction sent:', txHash);
//     } catch (error) {
//         console.error('Error adding follower:', error);
//     }
//    };

  const waitForTransactionReceipt = async (txHash) => {
    const maxRetries = 10;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            if (receipt) {
                return receipt;
            }
        } catch (error) {
            console.error('Error getting transaction receipt:', error);
        }
        retries++;
        await sleep(3000);
    }
    throw new Error('Transaction receipt not found');
   };

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
   };

  const createOrder = async () => {
    try {
		await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            throw new Error('No accounts found. Please check your MetaMask setup.');
        };
		if (contract==null || contract==undefined) {
            throw new Error('Contract instance not available.');
        }
		const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.order(tokenAddress, amount).encodeABI(),
            gasPrice: '4000000000', 
        };
		const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
      
        console.log('Order created successfully');
		console.log(txHash);

		const contractInstance = new web3.eth.Contract(transactionABI, tcontractAddress);
		if (contractInstance==null || contractInstance==undefined) {
            throw new Error('Contract instance not available.');
        }
		const txParameters = {
            from: accounts[0],
            to: tcontractAddress,
            data: contractInstance.methods.postTransactionHash(txHash).encodeABI(),
            gasPrice: '4000000000', 
        };
		console.log(txParameters);

		const tranctionHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [txParameters],
        });
		console.log("transaction hash sent");
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  useEffect(() => {
    const userFunction = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                throw new Error('No accounts found. Please check your MetaMask setup.');
            }

            while (true) {
                try {
                    const contractInstance = new web3.eth.Contract(transactionABI, tcontractAddress);
                    if (!contractInstance) {
                        throw new Error('Contract instance not available.');
                    }
                    const latestTransactionHash = await contractInstance.methods.getLatestTransactionHash().call();
                    setlatestTransactionHash(latestTransactionHash);
                    console.log('Latest transaction hash:', latestTransactionHash);
                } catch (error) {
                    console.error('Error retrieving latest transaction hash:', error);
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        } catch (error) {
            console.error('Error in userFunction:', error);
        }
    };

    userFunction();
}, [web3, tcontractAddress]); // Make sure to include dependencies here



const userTradingData = async () => {
    try {
		
	    const receipt = await waitForTransactionReceipt(latestTransactionHash);
		const typeArray=[{ type: 'address', name: 'follower' }, { type: 'address', name: 'token' }, { type: 'uint256', name: 'amount' }];
		const decodedParameters = web3.eth.abi.decodeParameters(typeArray, receipt.logs[0].data);
		console.log("from= ",decodedParameters[0])
		console.log("tokenid= ",decodedParameters[1])
		console.log("amount= ",decodedParameters[2])
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const fetchTransactionReceipt = (transactionHash, apiKey) => {
    const apiUrl = `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${transactionHash}&apikey=${apiKey}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch transaction receipt');
            }
            return response.json();
        })
        .then(transactionReceipt => transactionReceipt)
        .catch(error => {
            console.error('Error fetching transaction receipt:', error);
            throw error; // Propagate the error to the caller
        });
};

// Usage
const transactionHash = '0x27adcc5fc2dd74d15cb2c9ef68e14c7301fe3a65dca26138505219978de3eacd';
const apiKey = 'THWNGSS1XUKCBJQDV15431MXFUC1ANP7US';

fetchTransactionReceipt(transactionHash, apiKey)
    .then(transactionReceipt => {
		console.log('Transaction Receipt:', transactionReceipt);
        console.log('Transaction Receipt:', transactionReceipt.result.logs[0].data);
		const typeArray=[{ type: 'address', name: 'follower' }, { type: 'address', name: 'token' }, { type: 'uint256', name: 'amount' }];
		const decodedParameters = web3.eth.abi.decodeParameters(typeArray, transactionReceipt.result.logs[0].data);
		console.log("from= ",decodedParameters[0])
		console.log("tokenid= ",decodedParameters[1])
		console.log("amount= ",decodedParameters[2])
    })
    .catch(error => {
        console.error('Failed to fetch transaction receipt:', error);
    });



  return (
	<div className="App">
	<h1>Copy Trading DApp</h1>
	{isConnected ? (
	  <p>Connected with address: {walletAddress}</p>
	) : (
	  <button onClick={connectWallet}>Connect Wallet</button>
	)}
    <Dep isMaster={isConnected} masterAddress={slaveAddress} /> 
	<label htmlFor="MasterAddress">Master Address:</label>
	<input type="text" id="masterAddress" value={masterAddress} onChange={(e) => setMasterAddress(e.target.value)} />
	<button onClick={getContractAddress}>get contract address</button>
	<label htmlFor="MasterAddress">Master Address:</label>
	<button onClick={settContractAddress}>set contract address</button>

	<label htmlFor="UserTransaction">User Transaction Data:</label>
	<button onClick={userTradingData}>User Transaction Data</button>
	
	{/* <label htmlFor="followerAddress">Follower Address:</label>
	<input type="text" id="followerAddress" value={followerAddress} onChange={(e) => setFollowerAddress(e.target.value)} />
	<button onClick={addFollower}>Add Follower</button> */}

	<label htmlFor="tokenAddress">Token Address:</label>
	<input type="text" id="tokenAddress" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
	<label htmlFor="amount">Amount:</label>
	<input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
	<button onClick={createOrder}>Create Order</button>

  </div>
	
  );
}

export default Copy;
