
const currentadmin = JSON.parse(localStorage.getItem("admin"))

document.querySelector(".email").innerHTML = currentUser.email
document.querySelector(".amc").innerHTML = currentUser.bsc
// document.querySelector(".totalAmc").innerHTML = currentUser.amount
// document.querySelector(".refBonus").innerHTML = currentUser.refAmount
document.querySelector(".air").innerHTML = currentUser.airdropAmount
document.querySelector(".recieved").innerHTML = currentUser.receieved
document.querySelector(".facebook").innerHTML = currentUser.facebook
document.querySelector(".telegram").innerHTML = currentUser.telegram
document.querySelector(".twitter").innerHTML = currentUser.twitter
document.querySelector(".youtube").innerHTML = currentUser.youtube

console.log(currentUser)
const deleteBtn = document.querySelector(".deleteBtn")

// Update Total Amount Logic
const amount = document.querySelector(".amount")

const form = document.querySelector(".totalForm")

const btn = document.querySelector(".btn")

const updateAmount = async e => {

    e.preventDefault()

    const newUser = {
        amount: parseInt(amount.value)
    }
    btn.innerHTML = "Updating..."

    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                btn.innerHTML = "Update"
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
          window.location.href = "/admin/users"
  
        })
        .catch(function (error) {
          btn.innerHTML = "Update"
          console.log(error)
          window.alert("An Error Occured")
        })


}

form.addEventListener("submit", updateAmount)


// Update Total Amount Logic
const airAmount = document.querySelector(".airAmount")

const airForm = document.querySelector(".airForm")

const airBtn = document.querySelector(".airBtn")

const updateAirAmount = async e => {

    e.preventDefault()

    const newUser = {
      airdropAmount: airAmount.value,
      amount: (currentUser.amount + parseInt(airAmount.value))
    }
    airBtn.innerHTML = "Updating..."

    fetch(`${url}/user/update/${currentUser._id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
              return response.text().then((text) => {
                airBtn.innerHTML = "Update"
                return Promise.reject()
              });
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          console.log(data);
          airBtn.innerHTML = "Update"
          window.location.href = "/admin/users"
  
        })
        .catch(function (error) {
          airBtn.innerHTML = "Update"
          console.log(error)
          window.alert("An Error Occured")
        })


}

airForm.addEventListener("submit", updateAirAmount)


// Update Total Amount Logic
// const refAmount = document.querySelector(".refAmount")

// const refForm = document.querySelector(".refForm")

// const refBtn = document.querySelector(".refBtn")

// const updateRefAmount = async e => {

//     e.preventDefault()

//     const newUser = {
//       refAmount: refAmount.value,
//       amount: (currentUser.amount + parseInt(refAmount.value))
//     }
//     refBtn.innerHTML = "Updating..."

//     fetch(`${url}/user/update/${currentUser._id}`, {
//         method: "PUT",
//         body: JSON.stringify(newUser),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8"
//         },
//       })
//         .then(function (response) {
//           if (response.ok) {
//             return response.json();
//           } else {
//               return response.text().then((text) => {
//                 airBtn.innerHTML = "Update"
//                 return Promise.reject()
//               });
//           }
//           return Promise.reject(response);
//         })
//         .then(function (data) {
//           console.log(data);
//           airBtn.innerHTML = "Update"
//           window.location.href = "/admin/users"
  
//         })
//         .catch(function (error) {
//           airBtn.innerHTML = "Update"
//           console.log(error)
//           window.alert("An Error Occured")
//         })


// }

// refForm.addEventListener("submit", updateRefAmount)

// DELETE USER FROM DATABASE
const deleteThisUser = async () => {

  deleteBtn.innerHTML = "Deleting..."

  fetch(`${url}/user/delete/${currentadmin?.id}?id=${currentUser._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: `Bearer ${currentadmin?.token}`
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
              deleteBtn.innerHTML = "Delete"
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        deleteBtn.innerHTML = "Delete"
        window.location.href = "/admin/users"

      })
      .catch(function (error) {
        deleteBtn.innerHTML = "Delete"
        console.log(error)
        window.alert("An Error Occured")
      })


}

const deleteUser = () => {
      // confirm("Are you sure you want to log out?");
      if(confirm("Are you sure you want to delete user?")){
        deleteThisUser()
      } else {
          return;
      }
  }
  
deleteBtn.addEventListener("click", deleteUser)
