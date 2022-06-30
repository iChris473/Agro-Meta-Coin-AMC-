

// const plus = document.querySelector(".plus")
// const minus = document.querySelector(".minus")
const slotAmount = document.querySelector(".slotAmount")
// const slotNumber = document.querySelector(".slotNumber")
// const slotPrice = document.querySelector(".slotPrice")
const amcAmount = document.querySelector(".amcAmount")
const minError = document.querySelector(".minError")
const purchaseBtn = document.querySelector(".purchaseCoin")
const refIDD = document.querySelector(".refIDD")

refIDD.value = window.location.search.split("=")[1] || ""

// slotNumber.innerHTML = slotAmount.value
// slotPrice.innerHTML = parseInt(slotAmount.value) * 10
// amcAmount.innerHTML = (parseInt(slotAmount.value) * 10000).toLocaleString()

slotAmount.addEventListener("input", () => {
    // slotNumber.innerHTML = slotAmount.value
    // slotPrice.innerHTML = parseInt(slotAmount.value) * 10
    amcAmount.innerHTML = (parseInt(slotAmount.value) * 1000).toLocaleString()
    
})


// GET lIST OF AVAILABLE COINS

const coinList = document.querySelector(".coinList")

const getAvailableCoins = () => {

  fetch(`https://api.nowpayments.io/v1/currencies`, {
  method: "GET",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "x-api-key":"F1AWSHE-AH2MJAN-PE2MXR4-HWP9RG1"
  },
})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  })
  .then(function (data) {
      
    data.currencies
    .filter(tkn =>  
       tkn.toLowerCase() === "bnbbsc" ||
      //  tkn.toLowerCase() === "eth" ||
      //  tkn.toLowerCase() === "btc" ||
      //  tkn.toLowerCase() === "aave" ||
      //  tkn.toLowerCase() === "ltc" ||
       tkn.toLowerCase() === "trx" ||
       tkn.toLowerCase() === "busd"
      //  tkn.toLowerCase() === "busdbsc" ||
      //  tkn.toLowerCase() === "cake" 
    ).map(coin => {

      const options = document.createElement("option")
      options.className = "bg-transparent"
      options.value = coin
      options.innerHTML = coin.toUpperCase()

      coinList.appendChild(options)
  })


  })
  .catch(function (err) {
    console.log(err)
  })
  }

  getAvailableCoins()

  
  const blurDiv = document.querySelector('#blurDiv')

  const paymentModal = document.querySelector('.paymentModal')

  const xicon = document.querySelector('.xicon')
 
  // QUERY SELECTORS OF PAYMENT INFOS
  const payNetwork = document.querySelector('.payNetwork')
  const payNetwork2 = document.querySelector('.payNetwork2')
  const payAmount = document.querySelector('.payAmount')
  const copyTokenAddress = document.querySelector('.copyTokenAddress')

  xicon.addEventListener("click", () => {
    blurDiv.classList.remove("modalState")
    paymentModal.style.display = 'none'
  })

  const completePayment = e => {

    e.preventDefault()

    if(slotAmount.value < 10){
      minError.style.display = "block"
      window.location.href = "#slotAmount"
      return
    }

    purchaseBtn.innerHTML = "LOADING..."

    const newPaymentObject = {
      price_amount: (parseInt(slotAmount.value) + .3),
      price_currency: "usd",
      pay_currency: coinList.value,
      ipn_callback_url: "https://nowpayments.io",
      order_id: user._id,
      order_description: "AMC Presale"
    }

    fetch(`https://api.nowpayments.io/v1/payment`, {
      method: "POST",
      body: JSON.stringify(newPaymentObject),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-api-key":"F1AWSHE-AH2MJAN-PE2MXR4-HWP9RG1"
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
    
        console.log(data)

        createUserPresale(data)

    
      })
      .catch(function (err) {
        console.log(err)
        purchaseBtn.innerHTML = "PURCHASE"
      })

  }

  purchaseBtn.addEventListener("click", completePayment)

  async function createUserPresale(data) {
    try{
      
      // paymentId:    tkn.toLowerCase() === "5076584995" || data.payment_id,
      const newPresale = {
        userId: user.userid,
        paymentId: data.payment_id,
        bsc: user.bsc
      }
      refIDD.value && (newPresale.ref = refIDD.value)

      let response = await fetch(`${url}/presale/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPresale)
      });

      const resData =  await response.json();

      purchaseBtn.innerHTML = "PURCHASE"

      blurDiv.classList.add('modalState')
      paymentModal.style.display = "block"
      payNetwork.innerHTML = data.network.toUpperCase()
      payNetwork2.innerHTML = data.network.toUpperCase()
      payAmount.innerHTML = data.pay_amount
      document.querySelector(".coinAddress").innerHTML = data.pay_address
      document.querySelector(".usdAmount").innerHTML = "($" + (parseInt(slotAmount.value) + .3) + ")"
      
      copyTokenAddress.addEventListener('click', () => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText){
            navigator.clipboard.writeText(data.pay_address || 'please copy address')
            copyTokenAddress.style.color = 'green'
        }
            // return navigator.clipboard.writeText(refLink.innerHTML);
        return Promise.reject('The Clipboard API is not available.');
        })

    }catch(err){
      console.log(err);
      // Handle errors here
      purchaseBtn.innerHTML = "PURCHASE"
    }
  }

  const tHash = document.querySelector(".tHash")
  const tHashBtn = document.querySelector(".tHashBtn")
  const hashForm = document.querySelector(".hashForm")

  async function postHash(e) {

    e.preventDefault()

    tHashBtn.innerHTML = "Loading..."

    try{
      
      // paymentId:    tkn.toLowerCase() === "5076584995" || data.payment_id,
      const newPresale = {
        userId: user.userid,
        hash: tHash.value
      }

      let response = await fetch(`${url}/presale/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPresale)
      });

      await response.json();

      tHashBtn.innerHTML = "Complete Transaction"

      window.location.href = "/dashboard"


    }catch(err){
      console.log(err);
      // Handle errors here
      tHashBtn.innerHTML = "Complete Transaction"
    }

  }

  hashForm.addEventListener("submit", postHash)

  const copyIdToClipboard = (text, btn) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text)
        btn.innerHTML = "Copied"
    }
        // return navigator.clipboard.writeText(refLink.innerHTML);
    return Promise.reject('The Clipboard API is not available.');
    };

    const preventReload = e => {
      e.preventDefault()
    }
    document.querySelector('form').addEventListener('submit', preventReload)

  const refferalLink = 'www.agrometacoin.com/presale?ref=' + user.userid
  const presaleRefLink = document.querySelector('.presaleRefLink')
  presaleRefLink.value = refferalLink
  const copyRefLinkBtn = document.querySelector('.copyBtn')
  copyRefLinkBtn.addEventListener('click', copyIdToClipboard.bind(null, (refferalLink), copyRefLinkBtn))
