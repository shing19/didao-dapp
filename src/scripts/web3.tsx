export const web3js = {
    disconnect: () => {
      web3.eth.currentProvider
      .disconnect()
      .then(() => {
        console.log("fluent登出")
    })
    }
  }