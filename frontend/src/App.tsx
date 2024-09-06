import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers'
import config from './config.json'
import { useEffect, useState } from 'react';
import TokenTix from './utils/tokentixABI.json'


function App() {
  const [account, setAccount] = useState("")
  const loadBlockchain = async () => {
    const accounts  = await window.ethereum.request({method: 'eth_requestAccounts'})
    const accAddress = ethers.getAddress(accounts[0])
    console.log(accAddress)
    setAccount(accAddress)

    window.ethereum.on('accountsChanged', async () => {
      console.log('hi')
      const accounts  = await window.ethereum.request({method: 'eth_requestAccounts'})
    const accAddress = ethers.getAddress(accounts[0])
    console.log(accAddress)
    setAccount(accAddress)
    })
  }
  useEffect(() => {
loadBlockchain()
  }, [])
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <p>{account}</p>
    </div>
  );
}

export default App;
