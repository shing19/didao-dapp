import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Conflux, format } from 'js-conflux-sdk'
import Web3 from 'web3'

// const CONTRACT_base32 = import.meta.env.VITE_CONTRACT
// const CONTRACT_hex = 


const conflux = new Conflux({ 
    url: 'https://test.confluxrpc.com',
    networkId: 1,
    logger: console, 
});

window.confluxJS = conflux;
window.confluxJS.provider = window.conflux;

// 1. get internal contract through InternalContract method and pass the internal contract name
// const sponsor = conflux.InternalContract('SponsorWhitelistControl');
// const gasSponsor = await sponsor.getSponsorForGas('cfxtest:acg6rb7s9h1be63zjrhbyc5mc4w3jhk5p6eempe9hk');

window.contract =
  window.conflux &&
  window.confluxJS.Contract({
    address: import.meta.env.VITE_CONTRACT,
    abi: import.meta.env.VITE_ABI,
  })

async function main() {
  const name = await contract.name()
  const balance = await contract.balanceOf(import.meta.env.VITE_ACCOUNT)
  const balance_cfx = await conflux.cfx.getBalance(import.meta.env.VITE_ACCOUNT)
  const contract_account = conflux.wallet.addPrivateKey(format.hex(import.meta.env.VITE_PRIVATE_KEY))
  // const trans = await contract.transfer(import.meta.env.VITE_ACCOUNT, 10**11).sendTransaction({from: contract_account})
  // await conflux.cfx.sendTransaction({
  //   from: contract_account,
  //   to: import.meta.env.VITE_ACCOUNT,
  //   value: 1000,
  // });
  console.log('!!!!!!!',name, balance, balance_cfx)
};
main();



// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
