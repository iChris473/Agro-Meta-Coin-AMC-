

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const password = document.querySelector('.newPass');
const email = document.querySelector('.email');
const apiError = document.querySelector('.apiError');
const success = document.querySelector('.success');

email.value = admin.email || ""

const timeOut = () => {
    setTimeout(() => {
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    submit.disabled = true;

    submit.innerHTML = "Updating..."

    const newUser = {
        email: email.value,
    }
    console.log(newUser)
    fetch(`http://localhost:3000/api/admin/update/${admin.id}?p=${password.value}`, {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: `Bearer ${admin?.token}`
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
            return response.text().then((text) => {
              apiError.innerHTML = text;
              apiError.classList.remove("hidden")
              window.location.href = "#error"
              submit.innerHTML = "Update"
              submit.disabled = false;
              timeOut();
              return Promise.reject()
            });
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);


        const  {email, ...others} = admin
        const updatedUser = {...others, ...newUser }

        localStorage.setItem("user", JSON.stringify(updatedUser))
        
        submit.innerHTML = "Update"
        success.innerHTML = "Account successfully updated";
        success.classList.remove("hidden")
        submit.disabled = false;

      })
      .catch(function (error) {
        console.log(error)
        apiError.innerHTML = "Oops! An Error Occured";
        apiError.classList.remove("hidden")
        window.location.href = "#error"
        submit.innerHTML = "Update"
        submit.disabled = false;
        timeOut();
      })

}

form.addEventListener('submit',  submitForm)