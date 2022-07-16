

const currentadmin = JSON.parse(localStorage.getItem("admin"))

const tableBody = document.querySelector(".tableBody")

const front = document.querySelector(".front")
const frontIcon = document.querySelector(".frontIcon")
const back = document.querySelector(".back")
const backIcon = document.querySelector(".backIcon")

let jobs = []

let page = 1

let limit = 10

let totalPages = 100000

let presale = ""

const pageName = document.querySelector(".page")

const changeLimit = document.querySelector(".changeLimit")


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

      let serialNumber = 1
      console.log(mainList)

      mainList
      .sort(function(a, b){return (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime())})
      .forEach((user) =>{

        var date = new Date(user.updated_at)

        // Or even more concise (Thanks @RobG)
        const presaleDate = date.toLocaleString('en-GB', {day:'numeric', month: 'long'})

        const tableRow = document.createElement("tr")
        tableRow.className = "bg-white border-b hover:bg-gray-100 sdark:bg-gray-800 sdark:border-gray-700 tableRow"
        tableRow.innerHTML =
        `
        <td class="px-6 py-4 font-medium text-gray-900">
        ${serialNumber++}
        </td>
        <td class="px-6 py-4 font-medium text-gray-900">
        ${presaleDate}
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 sdark:text-white whitespace-nowrap cursor-pointer">
        ${user.order_id}
        </th>
        <td class="px-6 py-4 font-medium text-gray-900">
           $  ${
                Math
              .round(user.price_amount * user.actually_paid / user.pay_amount)
            }
        </td>
        <td class="px-6 py-4 font-medium text-gray-900">
        ${user.pay_currency.toUpperCase()}
        </td>
        <td class="px-6 py-4 font-medium text-gray-900">
        ${user.payin_hash}</td>

        `
          tableBody.appendChild(tableRow)
          tableRow.addEventListener("click", () => {
              window.location.href = "/admin/thisuser?id=" + user.order_id
          })

      })

    }catch(err){
      console.log(err);
    }

}

getPaymentList()

front.addEventListener("click", () => {
  page++
  tableBody.innerHTML = ""
  getAllusers()
})

back.addEventListener("click", () => {
  page = page - 1
  tableBody.innerHTML = ""
  getAllusers()
})

changeLimit.addEventListener("change", () => {
  limit = changeLimit.value
  page = 1
  tableBody.innerHTML = ""
  getAllusers()
})

// searchUser.addEventListener("input", () => {
//   user = searchUser.value
//   limit = 10
//   page = 1
//   tableBody.innerHTML = ""
//   filterUser()
// })


