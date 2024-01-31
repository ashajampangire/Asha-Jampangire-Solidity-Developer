// Import necessary libraries
import React, { useState, useEffect } from 'react';

const WalletConnectButton = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);

      // Add an event listener to update accounts when the user switches accounts
      window.ethereum.on('accountsChanged', (newAccounts) => {
        setAccounts(newAccounts);
      });
    } else {
      setIsMetaMaskInstalled(false);
    }
  }, []);

  const connectToMetaMask = async () => {
    try {
      // Request access to the user's MetaMask accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Retrieve the current accounts
      const currentAccounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccounts(currentAccounts);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <div>
      {isMetaMaskInstalled ? (
        <div>
          {accounts.length === 0 ? (
            <button onClick={connectToMetaMask}>Connect to MetaMask</button>
          ) : (
            <div>
              <p>Connected Accounts:</p>
              <ul>
                {accounts.map((account) => (
                  <li key={account}>{account}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>MetaMask is not installed. Please install MetaMask to use this feature.</p>
      )}
    </div>
  );
};

export default WalletConnectButton;
