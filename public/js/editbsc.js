

const submit = document.querySelector('.submit');
const oldBsc = document.querySelector('.oldBsc');
const newBsc = document.querySelector('.newBsc');
const apiError = document.querySelector('.apiError');
const success = document.querySelector('.success');
const password = document.querySelector('.password');

oldBsc.innerHTML = user.bsc

const timeOut = () => {
    setTimeout(() => {
        apiError.classList.add("hidden")
    }, 6000)
}

const submitForm = async e => {

    e.preventDefault();

    submit.disabled = true;

    
    const newUser = {
      bsc: newBsc.value,
      
    }


    if(newBsc.value == user.bsc ){
      apiError.classList.remove("hidden")
      apiError.innerHTML = "Please Enter a different Address"
      timeOut()
      submit.disabled = false;
      return
    }

    if(!newBsc.value || !password){
      apiError.classList.remove("hidden")
      apiError.innerHTML = "Please Fill Required Fields"
      timeOut()
      submit.disabled = false;
      return
    }
    
    submit.innerHTML = "Updating..."

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
              apiError.innerHTML = text.replace(/"/g, '');
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


        const  {bsc, ...others} = user
        const updatedUser = {...others, ...newUser}

        window.localStorage.setItem("user", JSON.stringify(updatedUser))
        
        submit.innerHTML = "Update"
        success.innerHTML = "Account successfully updated";
        success.classList.remove("hidden")
        submit.disabled = false;
        password.value = ""
        oldBsc.innerHTML = newBsc.value
        newBsc.value = ""

      })
      .catch(function (error) {
        console.log(error)
       
        timeOut();
      })

}

submit.addEventListener('click',  submitForm)