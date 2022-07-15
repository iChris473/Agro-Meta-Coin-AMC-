
const token = window.localStorage.getItem("token")
let recentUser = []
let recentRefs = []
const totalAmcCoins = document.querySelector(".totalCoin")

const copyId = document.querySelector(".copyBtn")
// const copyBtn = document.querySelector(".copyRefBtn")

const preventReload = e => {
  e.preventDefault()
}

document.querySelector('form').addEventListener('submit', preventReload)

const copyIdToClipboard = (text, btn) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text)
      btn.innerHTML = "Copied to clipboard"
      btn.className = "py-2 px-4 rounded-md bg-green-600 font-bold cursor-pointer copyBtn"
  }
      // return navigator.clipboard.writeText(refLink.innerHTML);
  return Promise.reject('The Clipboard API is not available.');
  };

copyId.addEventListener("click", copyIdToClipboard.bind(null, ("https://www.agrometacoin.com/register?ref=" + user.userid), copyId))
//copyBtn.addEventListener("click", copyIdToClipboard.bind(null, ("https://www.agrometacoin.com/register?ref=" + user.userid),copyId))


const getUserInformations = () => {

    fetch(`${url}/user/get/${user._id}?id=${user._id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {

      recentUser = data
      
      getReferralls()
      // UPDATE RECIEVED COINS
      document.querySelector(".receivedCoin").innerHTML = data.receieved
      //AIRDROP BONUS
      document.querySelector(".airBonus").innerHTML = data.airdropAmount
      // BSC ADDRESS
      document.querySelector(".bscAddressdash").innerHTML = data.bsc
      // REFERRAL LINK
      document.querySelector(".referallLinkDash").value  = "https://www.agrometacoin.com/register?ref=" + data.userid
      // USER EMAIL
      document.querySelector(".userEmail").innerHTML = data.email
      // USER EMAIL 2
      document.querySelector(".userEmail2").innerHTML = data.email
    
    })
    .catch(function (err) {
      console.log(err)
    })
    }
  
    getUserInformations()
  
    async function getReferralls(){
        fetch(`${url}/user/referrals?userid=${user.userid}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
                token: `Bearer ${user?.token}`
            },
          })
            .then(function (response) {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(response);
            })
            .then(function (data) {
  
              // Main Logic for all referall data
              recentRefs = data
              getPaymentIDs()
              // UPDATE REFERRAL BALANCE
              document.querySelector(".xreferalBalance").innerHTML = ( data.length * 2500 ).toLocaleString()
              // UPDATE REFERRAL NUMBER
              // document.querySelector(".xtotalReferall").innerHTML = data.length

              const tableBody = document.querySelector(".referrals--table");

              data.forEach((ref) => {

                const tableRow = document.createElement("div");

                tableRow.className =
                  "table data";

                tableRow.innerHTML = 
                  `

                  <p class="bio">
                      <span>${ref.email}</span>
                  </p>
                  <p class="bio">${ref.bsc}</p>
                  <p class="bio">Active</p>

                  `;
                tableBody.appendChild(tableRow);
              });

    })
            .catch(function (err) {
              console.log(err)
            })
    }
    

    async function getPaymentIDs() {

      try{
  
        let response = await fetch(`${url}/presale/user/${user.userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        const resData =  await response.json();
        console.log(resData)

        let totalPayment = 0

        if(resData?.paymentId){

          // FOR LOOPS OF ALL POSSIBLE PAYMENT INSTANCE
          for(const id of resData.paymentId){
  
            const paymentResult = await getPresaleBalance(id)
            
            // INCREMENT TOTALPAYMENT AND CREATE OR UPDATE INSTANCE OF PAYMENT
            if( (paymentResult.payment_status == "finished") || (paymentResult.payment_status == "partially_paid") ){

              const grandTotal = Math
              .round(paymentResult.price_amount * paymentResult.actually_paid / paymentResult.pay_amount)

              totalPayment += grandTotal

              updatePresaleAmount(grandTotal, id, paymentResult.updated_at, resData?.hash || '')

            }
  
          }

        }

        document.querySelector(".paidCoin").innerHTML = totalPayment
        // document.querySelector(".boughtCoins").innerHTML = "AMC " + totalPayment * 1000
        // document.querySelector(".boughtCoins2").innerHTML = "AMC " + totalPayment * 1000

        const assetsTotal = document.querySelector(".assetsTotal")
        const assetsTotal2 = document.querySelector(".assetsTotal2")
        
        document.querySelector(".presaleRefBonus").innerHTML = resData?.bonus || 0
        
        totalAmcCoins.innerHTML = (
          (recentUser.amount || user.amount) + 
          (totalPayment * 1000) + 
          recentUser.airdropAmount +
          (recentUser.receieved || user.receieved) +
          (resData?.bonus || 0) +
          (recentRefs.length * 5000) 
        ).toLocaleString()

        assetsTotal.innerHTML = "AMC " + (
          (recentUser.amount || user.amount) + 
          (totalPayment * 1000) + 
          recentUser.airdropAmount +
          (recentUser.receieved || user.receieved) +
          (resData?.bonus || 0) +
          (recentRefs.length * 5000) 
        ).toLocaleString()

        assetsTotal2.innerHTML = "AMC " + (
          (recentUser.amount || user.amount) + 
          (totalPayment * 1000) + 
          recentUser.airdropAmount +
          (recentUser.receieved || user.receieved) +
          (resData?.bonus || 0) +
          (recentRefs.length * 5000) 
        ).toLocaleString()

        // if(totalPayment > 0){
        //   updatePresaleAmount(totalPayment)
        // }
  
      }catch(err){
        console.log(err);
      }

    }

    async function getPresaleBalance(id) {

      try{
  
        let response = await fetch(`https://api.nowpayments.io/v1/payment/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":"F1AWSHE-AH2MJAN-PE2MXR4-HWP9RG1"
          }
        });
  
        const resData =  response.json();
  
        return resData
  
      }catch(err){
        console.log(err);
      }

    }
  

    async function updatePresaleAmount(amount, id, date, hash) {

      try{
  
        const newPresale = {
          userId: user.userid,
          amount,
          bsc: user.bsc,
          adminPaymentId: id,
          hash,
          date
        }
  
        let response = await fetch(`${url}/presale/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPresale)
        });
  
        const main = await response.json();
        console.log(main)

      }catch(err){

        console.log(err);
      
      }

    }

  