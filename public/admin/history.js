

const currentadmin = JSON.parse(localStorage.getItem("admin"))

const tableBody = document.querySelector(".tableBody")

async function getAllusers(){
    fetch(`${url}/history/get/${currentadmin?.id}`, {
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
          data.forEach((user) =>{

            const tableRow = document.createElement("tr")
            tableRow.className = "bg-gray-300 border-b hover:bg-gray-100 tableRow"
            tableRow.innerHTML =
            `
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap cursor-pointer">
              ${user.sender}
              </th>
              <td class="px-6 py-4 font-medium text-gray-900">
                  ${user.receiever}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
              ${user.wallet}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
              ${user.amount}
              </td>

            `
              tableBody.appendChild(tableRow)
          })
        })
        .catch(function (err) {
          console.log(err)
        })
}

getAllusers()