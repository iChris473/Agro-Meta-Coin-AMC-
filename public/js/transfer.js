

const form = document.querySelector('.form');
const btn = document.querySelector('.btn');
const type = document.querySelector('.type');
const coins = document.querySelector('.coins');
const recieverId = document.querySelector('.recieverId');
const apiError = document.querySelector('.apiError');
const success = document.querySelector('.success');

const timeOut = () => {
    setTimeout(() => {
        apiError.classList.add("hidden")
        success.classList.add("hidden")
    }, 6000)
}

form.addEventListener("submit",  e => {

    e.preventDefault()

    const transaction = {
        senderId: user.bsc,
        recieverId: recieverId.value,
        coins: coins.value,
        type: type.value
    }

    btn.innerHTML = 'Sending...'

    fetch(`${url}/user/sendamc`, {
      method: "PUT",
      body: JSON.stringify(transaction),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
                apiError.innerHTML = text;
                apiError.classList.remove("hidden")
                btn.innerHTML = "Send AMC"
                timeOut();
                return Promise.reject()
              });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        btn.innerHTML = "Send AMC"
        recieverId.value = ''
        coins.value = ''
        type.value = ''
        success.innerHTML = "Transaction Complete";
        success.classList.remove("hidden")
        timeOut();
      })
      .catch(function (error) {
        console.log(error)
      })

})