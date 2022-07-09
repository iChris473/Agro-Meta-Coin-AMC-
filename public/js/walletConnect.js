
// import Web3 from "web3"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3 from "web3"
// import WalletConnectProvider from "/@walletconnect/web3-provider"
// const WalletConnectProvider = require("@walletconnect/web3-provider");
// const Web3 = require("web3");

const connectBtn = document.querySelector('.connectBtn')
const WithdrawBtn = document.querySelector('.WithdrawBtn')

 var account;
 
//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
    infuraId: "bc6b366b74814ab0ab69fd6647e45fe4",
  });

  // Subscribe to session disconnection
provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
  });
  // Subscribe to session connection
provider.on("connect", (code, reason) => {
    connectBtn.innerHTML = "CONNECTED"
    console.log(code, reason);
  });


  // Check if connection exists
provider.connected && (connectBtn.innerHTML = "CONNECTED")


  const web3 = new Web3(provider);

  const connectWC = async () => {
      
      //  Enable session (triggers QR Code modal)
      await provider.enable();
      provider.connected && (connectBtn.innerHTML = "CONNECTED")

   var accounts  = await web3.eth.getAccounts(); // get all connected accounts
   console.log(accounts)
   account = accounts[0]; // get the primary account
     
 }


 const withdrawFunds = async () => {
     
     // Draft transaction
    const tx = {
        // from: "0x39ECA3740673a9B819e3D8B7774eBCA8A550eADe", // Required
        to: account, // Required (for non contract deployments)
        data: web3.utils.toWei('0.003', 'noether'), // Required
      };
    
     // Send Transaction
    await web3.eth.sendTransaction(tx);
    console.log("Transaction Successful")
 
}

WithdrawBtn.addEventListener("click", withdrawFunds)

 connectBtn.addEventListener("click", connectWC)
