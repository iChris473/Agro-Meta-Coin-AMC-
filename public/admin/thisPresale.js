
const currentadmin = JSON.parse(localStorage.getItem("admin"))

const presale = JSON.parse(localStorage.getItem("thisPresale"))

console.log(presale)

document.querySelector(".userBsc").innerHTML = presale.bsc
document.querySelector(".userAmount").innerHTML = (parseInt(presale.amount) + parseInt(presale.bonus)).toLocaleString()
document.querySelector(".refBsc").innerHTML = presale.refBsc || "N/A"
document.querySelector(".refAmount").innerHTML = presale.refBsc ? (presale.amount * .1).toLocaleString()
: "N/A"
document.querySelector(".downBsc").innerHTML = presale.grandRefBsc || "N/A"
document.querySelector(".downAmount").innerHTML = presale.grandRefBsc ? (presale.amount * .05).toLocaleString()
: "N/A"
document.querySelector(".paid").innerHTML = presale.paid
document.querySelector(".hash").innerHTML = presale.hash || "N/A"


const deleteBtn = document.querySelector(".deleteBtn")

// Update Total Amount Logic
const option = document.querySelector("select")

const form = document.querySelector("form")

const btn = document.querySelector("button")

const updatePayStatus = async e => {

    e.preventDefault()

    const newUser = {
        paid: option.value,
        userId: presale.userId
    }
    btn.innerHTML = "Updating..."

    fetch(`${url}/presale/generate`, {
        method: "POST",
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
          window.location.href = "/admin/presales"
  
        })
        .catch(function (error) {
          btn.innerHTML = "Update"
          console.log(error)
          window.alert("An Error Occured")
        })


}

form.addEventListener("submit", updatePayStatus)

// DELETE USER FROM DATABASE
const deleteThisUser = async () => {

  deleteBtn.innerHTML = "Deleting..."

  fetch(`${url}/presale/generate${currentadmin?.id}`, {
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
