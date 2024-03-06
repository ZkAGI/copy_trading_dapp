import React, { useState } from 'react';
import Web3 from 'web3';
import { deployContract } from './Deploycontract';
import Dep from './Dep';


function Copy() {
  const [followerAddress, setFollowerAddress] = useState('');
  const [masterAddress, setMasterAddress] = useState('');
  const [removeFollowerAddress, setRemoveFollowerAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [slaveAddress, setSlaveAddress] = useState('');
  const [contractAddress, setContractAddress] = useState(''); 
  const [contract, setContract] = useState(null);

  const registeryAddress = "0x45eFAc3BbF71819CB6d49991413907d613638783";
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
]
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
  const web3 = new Web3(Web3.givenProvider || 'https://rpc2.sepolia.org/');
  const registeryContract = new web3.eth.Contract(registeryABI, registeryAddress);


  const handleDeployContract = async () => {
    try {
      console.log('Deploying contract...');
      const contractAddress = await deployContract(web3.eth.defaultAccount);
      console.log('Contract deployed at:', contractAddress);
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
        console.log("Contract Address for User:", contractAddress);
		if(contractAddress!=undefined && contractAddress!=null){
		const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
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
	
			console.log('Follower added successfully');
			console.log('Sending transaction...');
			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [transactionParameters],
			});}
    } catch (error) {
        console.error("Error getting contract address:", error);
    }
   };

  const addFollower = async () => {
    try {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length === 0) {
            throw new Error('No accounts found. Please check your MetaMask setup.');
        }
		if (contract==null || contract==undefined) {
            throw new Error('Contract instance not available.');
        }
        const transactionParameters = {
            from: accounts[0],
            to: contractAddress,
            data: contract.methods.addFollower(followerAddress).encodeABI(),
            gasPrice: '4000000000', 
        };

        console.log('Follower added successfully');
		console.log('Sending transaction...');
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
		
        console.log('Transaction sent:', txHash);
    } catch (error) {
        console.error('Error adding follower:', error);
    }
   };

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
	    const receipt = await waitForTransactionReceipt(txHash);
        console.log('Transaction receipt:', receipt.logs);
		
		const typeArray=[{ type: 'address', name: 'follower' }, { type: 'address', name: 'token' }, { type: 'uint256', name: 'amount' }];
		const decodedParameters = web3.eth.abi.decodeParameters(typeArray, receipt.logs[0].data);
		console.log("from= ",decodedParameters[0])
		console.log("tokenid= ",decodedParameters[1])
		console.log("amount= ",decodedParameters[2])

		// console.log(contract)
		// if (contract){
		// contract.events.OrderCreatedEvent()
		// .on('data', function(event) {
		// 	// Handle the received event data
		// 	console.log(event);
		//   })
		//   .on('error', function(error) {
		// 	// Handle errors
		// 	console.error(error);
		//   });}
	

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  

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
	
	<label htmlFor="followerAddress">Follower Address:</label>
	<input type="text" id="followerAddress" value={followerAddress} onChange={(e) => setFollowerAddress(e.target.value)} />
	<button onClick={addFollower}>Add Follower</button>

	<label htmlFor="tokenAddress">Token Address:</label>
	<input type="text" id="tokenAddress" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
	<label htmlFor="amount">Amount:</label>
	<input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
	<button onClick={createOrder}>Create Order</button>

  </div>
	
  );
}

export default Copy;
