import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ethers} from 'ethers'
import config from './config.json'
import { useEffect, useState } from 'react';
import TokenTix from './utils/tokentixABI.json'
import NavBar from './components/NavBar';


function App() {
  const [account, setAccount] = useState("")
  const [provider, setProvider] = useState<any|null>(null)
  const loadBlockchain = async () => {
    // const accounts  = await window.ethereum.request({method: 'eth_requestAccounts'})
    // const accAddress = ethers.getAddress(accounts[0])
    // console.log(accAddress)
    // setAccount(accAddress)
   
    const provider = new ethers.BrowserProvider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const tokenTix = new ethers.Contract(config['31337'].TokenMaster.address, TokenTix, provider)
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
      
    <header>
    <NavBar account={account} setAccount={setAccount}></NavBar>
      <h1 className='main-page-header'>Token Tix</h1>
    </header>
      <h1>Hello World!</h1>
      <p>{account}</p>
    </div>
  );
}

export default App;
