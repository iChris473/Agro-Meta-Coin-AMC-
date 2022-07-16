
    const paymntData = document.querySelector('.paymntData')

    async function getPaymentList() {

        try{
    
          let response = await fetch(`https://api.nowpayments.io/v1/payment/?limit=500&page=0&sortBy=created_at&orderBy=desc&dateFrom=2022-01-01&dateTo=2025-01-01`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "x-api-key":"F1AWSHE-AH2MJAN-PE2MXR4-HWP9RG1"
              }
          });
    
          const resData =  await response.json();
          //   console.log(resData)
          const mainList = resData.data.filter(list => (list.payment_status == "finished") || (list.payment_status == "partially_paid"))
          console.log(mainList)
          
          paymntData.innerHTML = mainList.length
    
        }catch(err){
          console.log(err);
        }
  
    }

    getPaymentList()