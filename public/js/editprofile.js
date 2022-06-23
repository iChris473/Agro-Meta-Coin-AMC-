

const form = document.querySelector('.form');
const submit = document.querySelector('.submit');
const amc = document.querySelector('.amc');
const email = document.querySelector('.email');
const apiError = document.querySelector('.apiError');
const success = document.querySelector('.success');
const password = document.querySelector('.password');

amc.value = user.bsc || ""
email.value = user.email || ""

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
      bsc: amc.value,
      
    }

    if(user.email != email.value){
      newUser.email = email.value
    }

    if(!email.value || !amc.value){
      apiError.classList.remove("hidden")
      apiError.innerHTML = "Please Fill Required Fields"
      timeOut()
      submit.disabled = false;
      submit.innerHTML = "Update"
      return
    }
    

    console.log(newUser)

    fetch(`${url}/user/update/${user._id}?p=${password.value}`, {
      method: "PUT",
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


        const  {email, amc, ...others} = user
        const updatedUser = {...others, ...newUser}

        window.localStorage.setItem("user", JSON.stringify(updatedUser))
        
        submit.innerHTML = "Update"
        success.innerHTML = "Account successfully updated";
        success.classList.remove("hidden")
        submit.disabled = false;
        password.value = ""

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