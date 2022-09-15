import React, { memo, useCallback } from 'react'
import { useStatus, useAccount, useChainId, useBalance, connect, Unit, sendTransaction } from '@cfxjs/use-wallet-react/conflux'
import { provider } from './scripts/fluent'
import { web3js } from './scripts/web3'
import { contractor } from './scripts/contract'


const App: React.FC = () => {
  const status = useStatus();

  return (
      <div className="App">
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
  // const balance = useBalance();
  const balance = contractor.balanceof(account);
  // console.log('render once: ', account, chainId, balance?.toDecimalStandardUnit())

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


  return (
      <div className="App">
          <p>account: {account}</p>
          <p>chainId: {chainId}</p>
          <p>balance: {balance}</p>
          <p>
              {/* balance: {`${balance?.toDecimalStandardUnit()} CFX`} */}
          </p>

          <button onClick={handleClickSendTransaction}>
              Send 1 native token to self (connected account)
          </button>
      </div>
  );
});

export default App
 