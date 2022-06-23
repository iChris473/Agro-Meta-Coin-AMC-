const navContainer = document.querySelector('.nav');
const toggleClick = document.getElementById("check");
const hamContainer = document.querySelector(".hamburger--container")
let check = false;

const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#reg");
const loginBtn_D = document.querySelector("#login-d");
const signupBtn_D = document.querySelector("#reg-d");

function toggle(){
    if(!check){
        navContainer.classList.add('open')
        hamContainer.style.position = "fixed"
        check = true
    }
    else{
        navContainer.classList.remove('open')
        hamContainer.style.position = "relative"
        check = false
    }
}
toggleClick.addEventListener("click", toggle)

function redirect(e){
    const {value} = e.target
    if(value === "login"){
        window.location.href = "/login"
    }
    else if(value === "dashboard"){
        window.location.href = "/dashboard"
    }
    else {
        window.location.href = "/register"
    }
}

loginBtn.addEventListener("click", redirect)
signupBtn.addEventListener("click", redirect)

loginBtn_D.addEventListener("click", redirect)
signupBtn_D.addEventListener("click", redirect)