import { Conflux, format } from "js-conflux-sdk";
import abi from "../scripts/compiled.abi?raw"
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const CONTRACT_bsae32 = 'cfxtest:acgwnjmd623nvmz7s5a9bwn2kfy4mmujtu06k8zv6c'
const CONTRACT_hex = format.hexAddress(CONTRACT_bsae32)

const conflux = new Conflux({
    url: 'https://test.confluxrpc.com',
    networkId: 1, 
  });

const contract = conflux.Contract({
    address: CONTRACT_hex,
    abi: abi
})

export const contractor = {
    balanceof: (account) => {
        // 查看供应总量
        let result = contract.totalSupply().data;
        console.log("Total supply:"  + result.toString());
        const balance = contract.balanceOf(account).data;
        // const balance_decode = web3.utils.hexToUtf8(balance);
        console.log("账户余额：", balance)
        return balance
    }
}