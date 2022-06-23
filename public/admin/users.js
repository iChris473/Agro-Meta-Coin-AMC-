

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

let user = ""

const pageName = document.querySelector(".page")

const changeLimit = document.querySelector(".changeLimit")

const searchUser = document.querySelector(".searchUser")

async function getAllusers(){
    fetch(`${url}/user/all/${currentadmin.id}?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
            token: `Bearer ${currentadmin?.token}`
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);

            if (data.pages == page) {
              front.disabled = true;
              frontIcon.style.color = 'red'
            } else {
              front.disabled = false
              frontIcon.style.color = 'rgb(75 85 99)'
              
            }

            if (data.page == 1) {
              back.disabled = true;
              backIcon.style.color = 'red'
            } else {
              back.disabled = false
              backIcon.style.color = 'rgb(75 85 99)'
            }
          
          pageName.innerHTML = `Page ${data.page}`

          data.data.forEach((user) =>{

            const tableRow = document.createElement("tr")
            tableRow.className = "bg-white border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 tableRow"
            tableRow.innerHTML =
            `
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap cursor-pointer">
            ${user.email}
            </th>
            <td class="px-6 py-4 font-medium text-gray-900">
            ${user.bsc}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900">
            ${user.airdropAmount}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900">
            ${user.refAmount}
            </td>
            <td class="px-6 py-4 font-medium text-gray-900">
            ${user.amount}
            </td>

            `
              tableBody.appendChild(tableRow)
              tableRow.addEventListener("click", () => {
                  localStorage.setItem("thisUser", JSON.stringify(user))
                  window.location.href = "/admin/thisuser"
              })
          })
        })
        .catch(function (err) {
          console.log(err)
        })

}

getAllusers()

async function filterUser(){
    fetch(`${url}/user/search/${currentadmin.id}?user=${user}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
            token: `Bearer ${currentadmin?.token}`
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
          
          pageName.innerHTML = `Filter Page`

          tableBody.innerHTML = ""

          data.forEach((user) =>{

            const tableRow = document.createElement("tr")
            tableRow.className = "bg-white border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 tableRow"
            tableRow.innerHTML =
            `
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap cursor-pointer">
              ${user.email}
              </th>
              <td class="px-6 py-4 font-medium text-gray-900">
              ${user.bsc}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
              ${user.airdropAmount}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
              ${user.refAmount}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
              ${user.amount}
              </td>

            `
              tableBody.appendChild(tableRow)
              tableRow.addEventListener("click", () => {
                  localStorage.setItem("thisUser", JSON.stringify(user))
                  window.location.href = "/admin/thisuser"
              })
          })
        })
        .catch(function (err) {
          console.log(err)
        })

}

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

searchUser.addEventListener("input", () => {
  user = searchUser.value
  limit = 10
  page = 1
  tableBody.innerHTML = ""
  filterUser()
})


