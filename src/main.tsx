import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Conflux } from 'js-conflux-sdk'
import Web3 from 'web3'

const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1, 
  logger: console, 
});
window.confluxJS = conflux;
window.confluxJS.provider = window.conflux;

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
