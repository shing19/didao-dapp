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

console.log('rest start')
async function test() {
    const account = 'cfxtest:aam3c8e8jge8mr5r25jgj1ap27xjkgfw52wvtn79j3'
    const result = await contract.transfer(account, 1000)
    console.log('transfer complete')
    const balance = await contract.balanceOf(account)
    console.log("账户余额：", balance)
}


export async function ContractFreeToken(account) {
    console.log('开始新手领取')
    // const result = await contract.transfer(account, 10)
    // console.log('新手领取：', result)
    return null
}


export const contractor = {
    balanceof: (account) => {
        // 查看供应总量
        let result = contract.totalSupply().data;
        console.log("Total supply:"  + result.toString());
        const balance = contract.balanceOf(account).data;
        // const balance_decode = web3.utils.hexToUtf8(balance);
        console.log("账户余额：", balance)
        return balance
    },
    enter: (account) => {
        contract.transfer(account, 1000);
        console.log("新手领取 1000 token")
        const balance = contract.balanceOf(account).data;
        // const balance_decode = web3.utils.hexToUtf8(balance);
        console.log("账户余额：", balance)
        return null
    }
}
