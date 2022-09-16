import React, { memo, useCallback } from 'react';
import { useStatus, useAccount, useChainId, useBalance, connect, Unit, sendTransaction } from '@cfxjs/use-wallet-react/conflux';
import { Conflux, format } from "js-conflux-sdk";
import './App.css'

const conflux = new Conflux({ 
    url: 'https://test.confluxrpc.com',
    networkId: 1,
    logger: console, 
});

const App: React.FC = () => {    
    const status = useStatus();

    return (
        <div>
            {status !== 'in-detecting' && status !== 'active' && (
                <button
                    onClick={connect}
                    disabled={status !== 'not-active'}
                >
                    {status === 'in-activating' && 'connecting...'}
                    {status === 'not-installed' && 'Fluent Not Install'}
                    {status === 'not-active' && 'Connect Fluent'}
                </button>
            )}
            {status === 'active' && <WalletInfo />}
        </div>
    );
};

const WalletInfo: React.FC = memo(() => {
    const account = useAccount();
    const chainId = useChainId();
    const balance = useBalance();
    console.log('render once: ', account, chainId, balance?.toDecimalStandardUnit())

    // Send 1 native token to self (connected account)
    const handleClickSendTransaction = useCallback(async () => {
        // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
        if (!account) return;

        try {
            const TxnHash = await sendTransaction({
                to: account,
                value: Unit.fromStandardUnit('1').toHexMinUnit(),
            });
            console.log(TxnHash)
        } catch (err) {
            console.error(err)
        }
    }, [account]);

    const FreeToken = useCallback(async () => {
        if (!account) return;

        try {
            const contract_account = conflux.wallet.addPrivateKey(format.hex(import.meta.env.VITE_PRIVATE_KEY))
            const TxnHash = await window.contract.transfer(account, 10**11).sendTransaction({from: contract_account})
            console.log(TxnHash)
        } catch (err) {
            console.log(err)
        }
    }, [account]);


    return (
        <div>
            <p>account: {account}</p>
            <p>chainId: {chainId}</p>
            <p>
                balance: {`${balance?.toDecimalStandardUnit()} CFX`}
            </p>

            {/* <button onClick={handleClickSendTransaction}>
                Send 1 native token to self (connected account)
            </button> */}
            <button onClick={FreeToken}>
                Get 1000 token to start
            </button>
            <p style={{margin:10}}></p>
            <button>新建项目</button>
            <p style={{margin:800}}></p>
            <p>目标营收</p>
            <input type="text" />
            <p style={{margin:10}}></p>
            <button>按角色</button>
            <button>按任务</button>
            <p style={{margin:10}}></p>
            <p>任务1</p>
            <input type="text" />
            <p>任务2</p>
            <input type="text" />
            <p>任务3</p>
            <input type="text" />
            <p>任务4</p>
            <input type="text" />
            <p>任务5</p>
            <input type="text" />
            <p style={{margin:500}}></p>

        </div>
    );
});

export default App;