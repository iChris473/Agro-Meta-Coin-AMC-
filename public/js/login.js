

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const password = document.querySelector('#password');
const bsc = document.querySelector('#bsc');
const apiError = document.querySelector('.apiError');


const timeOut = () => {
  setTimeout(() => {
    apiError.classList.add("hidden")
  }, 6000)
}

const submitForm = async e => {

  e.preventDefault();

  submit.disabled = true;

  submit.innerHTML = "Signin in..."

  const newUser = {
    bsc: bsc.value,
    password: password.value,

  }

  console.log(newUser)

  fetch(`${url}/user/login`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          apiError.innerHTML = text.replace(/"/g, '');
          apiError.classList.remove("hidden")
          submit.innerHTML = "Login"
          timeOut();
          submit.disabled = false;
          return Promise.reject()
        });
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log(data);

      window.localStorage.setItem("user", JSON.stringify(data))
      window.localStorage.setItem("token", JSON.stringify(data.token))
      submit.innerHTML = "Login"
      window.location.href = "/dashboard"

    })
    .catch(function (error) {
      console.log(error)
      submit.disabled = false;
      // window.alert("Something went wrong.", error);


    })

}

form.addEventListener('submit', submitForm)