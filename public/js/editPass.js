


const submit = document.querySelector('.submit');
const confirmPass = document.querySelector('.confirmPass');
const oldPass = document.querySelector('.oldPass');
const newPass = document.querySelector('.newPass');
const mismatch = document.querySelector('.mismatch');
const apiError = document.querySelector('.apiError');
const success = document.querySelector('.success');

const timeOut = () => {
    setTimeout(() => {
        mismatch.classList.add("hidden")
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    if(confirmPass.value != newPass.value){
        mismatch.classList.remove("hidden")
        window.location.href = "#error"
        timeOut()
        return
    }
    if(!confirmPass.value || !newPass.value || !oldPass.value){
        apiError.classList.remove("hidden")
        apiError.innerHTML = "Please fill all fields"
        timeOut()
        return
    }
    submit.innerHTML = "Updating..."

    fetch(`${url}/user/update/${user._id}?p=${oldPass.value}`, {
      method: "PUT",
      body: JSON.stringify({ password: newPass.value}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: `Bearer ${user?.token}`
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
              apiError.innerHTML = text.replace(/"/g, '');
              apiError.classList.remove("hidden")
              submit.innerHTML = "Update"
              timeOut();
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        submit.innerHTML = "Update"
        success.innerHTML = "Password successfully updated";
        success.classList.remove("hidden")
        newPass.value = ""
        oldPass.value = ""
        confirmPass.value = ""
      })
      .catch(function (error) {
        console.log(error)
      })

}

submit.addEventListener('click',  submitForm)