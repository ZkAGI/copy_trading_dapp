import React from 'react';
import { deployContract } from './Deploycontract'; 

function Dep({ isMaster, masterAddress }) { 
    console.log(masterAddress)
  const handleDeployContract = async () => {
    if (!isMaster) {
      console.error('Only the master can deploy the contract.');
      return;
    }
    console.log('Deploying contract...');
    try {
      const contractAddress = await deployContract(masterAddress); 
      console.log('Contract deployed at:', contractAddress);
    } catch (error) {
      console.error('Error deploying contract:', error);
    }
    };

  return (
    <div>
      {isMaster && <button onClick={handleDeployContract}>Deploy Contract</button>}
    </div>
  );
}

export default Dep;
